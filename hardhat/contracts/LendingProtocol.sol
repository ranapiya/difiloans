// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./INFTOracle.sol";

contract LendingProtocol is ReentrancyGuard, Ownable {
    IERC20 public immutable loanToken;      // token lent out (e.g., SOMI test token)
    INFTOracle public immutable oracle;

    uint256 public ltvPercent = 50; // default LTV (50%)
    uint256 public constant YEAR = 365 days;

    uint256 public loanCount;

    struct Loan {
        uint256 id;
        address borrower;
        address nftAddress;
        uint256 tokenId;
        uint256 principal;       // in loanToken units (wei)
        uint256 startTime;
        uint256 duration;        // seconds
        uint256 interestRateBP;  // basis points per year (10000 = 100%)
        bool repaid;
        bool liquidated;
    }

    // For MVP: one active collateral per borrower (simplifies bookkeeping)
    struct Collateral {
        address nftAddress;
        uint256 tokenId;
        bool exists;
    }

    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public borrowerLoans;
    mapping(address => Collateral) public collaterals;

    event NFTDeposited(address indexed user, address indexed nft, uint256 tokenId);
    event Borrowed(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event Repaid(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event Liquidated(uint256 indexed loanId, address indexed liquidator);

    constructor(IERC20 _loanToken, INFTOracle _oracle) {
        loanToken = _loanToken;
        oracle = _oracle;
    }

    // deposit an NFT as collateral (contract must be approved or user uses safeTransferFrom directly)
    function depositNFT(address nftAddress, uint256 tokenId) external nonReentrant {
        require(!collaterals[msg.sender].exists, "existing collateral");
        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        collaterals[msg.sender] = Collateral(nftAddress, tokenId, true);
        emit NFTDeposited(msg.sender, nftAddress, tokenId);
    }

    // withdraw collateral only when borrower has no active loan
    function withdrawCollateral() external nonReentrant {
        Collateral memory c = collaterals[msg.sender];
        require(c.exists, "no collateral");
        uint256[] memory bLoans = borrowerLoans[msg.sender];
        for (uint i = 0; i < bLoans.length; i++) {
            Loan memory ln = loans[bLoans[i]];
            require(ln.repaid || ln.liquidated, "active loan exists");
        }
        delete collaterals[msg.sender];
        IERC721(c.nftAddress).safeTransferFrom(address(this), msg.sender, c.tokenId);
    }

    // borrow against deposited collateral
    // amount is in loanToken smallest units (wei)
    // interestRateBP is APR in basis points (e.g., 500 = 5% APR)
    function borrow(uint256 amount, uint256 duration, uint256 interestRateBP) external nonReentrant {
        Collateral memory c = collaterals[msg.sender];
        require(c.exists, "no collateral");
        uint256 floor = oracle.getFloorPrice(c.nftAddress, c.tokenId);
        uint256 maxLoan = (floor * ltvPercent) / 100;
        require(amount <= maxLoan, "exceeds LTV");
        require(loanToken.balanceOf(address(this)) >= amount, "insufficient liquidity");

        loanCount++;
        loans[loanCount] = Loan({
            id: loanCount,
            borrower: msg.sender,
            nftAddress: c.nftAddress,
            tokenId: c.tokenId,
            principal: amount,
            startTime: block.timestamp,
            duration: duration,
            interestRateBP: interestRateBP,
            repaid: false,
            liquidated: false
        });

        borrowerLoans[msg.sender].push(loanCount);
        // transfer loan amount to borrower
        require(loanToken.transfer(msg.sender, amount), "transfer failed");

        emit Borrowed(loanCount, msg.sender, amount);
    }

    // calculate total owed: principal + accrued interest
    function calculateOwed(uint256 loanId) public view returns (uint256) {
        Loan memory ln = loans[loanId];
        require(ln.id != 0, "loan not found");
        if (ln.repaid) return 0;
        uint256 elapsed = block.timestamp - ln.startTime;
        // interest = principal * rateBP / 10000 * elapsed / YEAR
        uint256 interest = (ln.principal * ln.interestRateBP * elapsed) / (10000 * YEAR);
        return ln.principal + interest;
    }

    // repay loan and receive NFT back
    function repayLoan(uint256 loanId) external nonReentrant {
        Loan storage ln = loans[loanId];
        require(ln.id != 0, "loan not found");
        require(!ln.repaid, "already repaid");
        require(ln.borrower == msg.sender, "not borrower");

        uint256 owed = calculateOwed(loanId);
        // borrower must approve loanToken to this contract
        require(IERC20(loanToken).transferFrom(msg.sender, address(this), owed), "payment failed");

        ln.repaid = true;

        // return NFT
        IERC721(ln.nftAddress).safeTransferFrom(address(this), ln.borrower, ln.tokenId);
        // remove collateral entry
        delete collaterals[msg.sender];

        emit Repaid(loanId, msg.sender, owed);
    }

    // liquidate loan: anyone can call if loan is past due OR undercollateralized
    // reward for liquidator = NFT (MVP). In production you'd implement auction / sale / partial repay.
    function liquidateLoan(uint256 loanId) external nonReentrant {
        Loan storage ln = loans[loanId];
        require(ln.id != 0, "loan not found");
        require(!ln.repaid && !ln.liquidated, "not active");

        uint256 floor = oracle.getFloorPrice(ln.nftAddress, ln.tokenId);
        uint256 owed = calculateOwed(loanId);

        // allow liquidation if duration passed OR owed > floor (undercollateralized)
        if (block.timestamp < ln.startTime + ln.duration) {
            require(owed > floor, "not undercollateralized");
        }

        ln.liquidated = true;
        // transfer NFT to caller (liquidator)
        IERC721(ln.nftAddress).safeTransferFrom(address(this), msg.sender, ln.tokenId);
        // clear collateral
        delete collaterals[ln.borrower];

        emit Liquidated(loanId, msg.sender);
    }

    // owner config
    function setLTV(uint256 _ltvPercent) external onlyOwner {
        require(_ltvPercent <= 90, "ltv too high");
        ltvPercent = _ltvPercent;
    }

    // fund the lending pool with loanToken
    function fundPool(uint256 amount) external {
        require(IERC20(loanToken).transferFrom(msg.sender, address(this), amount), "transfer failed");
    }

    function withdrawPool(uint256 amount) external onlyOwner {
        require(IERC20(loanToken).transfer(msg.sender, amount), "transfer failed");
    }

    // required receiver method for safeTransferFrom
    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return this.onERC721Received.selector;
    }
}

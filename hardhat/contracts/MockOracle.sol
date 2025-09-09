// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./INFTOracle.sol";

contract MockOracle is Ownable, INFTOracle {
    // simple collection-level floor (you can extend to per-token if needed)
    mapping(address => uint256) public floorPrice;

    function setFloorPrice(address nft, uint256 price) external onlyOwner {
        floorPrice[nft] = price;
    }

    function getFloorPrice(address nft, uint256 /* tokenId */) external view override returns (uint256) {
        uint256 p = floorPrice[nft];
        require(p > 0, "price not set");
        return p;
    }
}

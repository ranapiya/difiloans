// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("MockNFT", "MNFT") {}

    function mint(address to) external onlyOwner returns (uint256) {
        nextTokenId++;
        _mint(to, nextTokenId);
        return nextTokenId;
    }
}

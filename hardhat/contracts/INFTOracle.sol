// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface INFTOracle {
    // price should be in same token decimals as loan token (we assume 18 decimals in the examples)
    function getFloorPrice(address nft, uint256 tokenId) external view returns (uint256);
}

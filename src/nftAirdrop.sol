// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NftAirdrop is ERC721 {

   address public owner;
   constructor() ERC721("Razr NFT", "RZR") {
      owner = msg.sender;
   }
   
   bytes32 public merkleRoot = 0xda9a9355401e3351c2b99c07ef2b74c3c74bbfde4e5717d338c51717708ad858;

    mapping(address => bool) hasMinted;

    function nftMint(
        bytes32[] calldata _merkleProof,
        uint256 _tokenId
    ) public {
        if (hasMinted[msg.sender]) revert("Already minted NFT");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf));

        _mint(msg.sender, _tokenId);

        hasMinted[msg.sender] = true;
    }
}

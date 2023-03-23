import MerkleTree from "merkletreejs";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import fs from "fs";

let whiteListedAddresses = [
    "0x28C6c06298d514Db089934071355E5743bf21d60",
    "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503",
    "0xA7A93fd0a276fc1C0197a5B5623eD117786eeD06",
    "0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf",
    "0xD6216fC19DB775Df9774a6E33526131dA7D19a2c"
]

const leaveNodes = whiteListedAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leaveNodes, keccak256, { sortPairs: true});

const root = merkleTree.getHexRoot();

console.log(`Merkle tree: ${merkleTree.toString()}`);
console.log(`Roothash: ${root.toString()}`);

const treeJson = {
    "merkleTree": merkleTree.toString(),
};

fs.writeFileSync("tree.json", JSON.stringify(treeJson), );


const claimer = leaveNodes.map(node => merkleTree.getHexProof(node));

// const hexProof = merkleTree.getHexProof(claimer);

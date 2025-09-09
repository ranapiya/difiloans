import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Deploy Mock ERC20
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const mockERC20 = await MockERC20.deploy("MockToken", "MKT");
  await mockERC20.deployed();
  console.log("✅ MockERC20 deployed at:", mockERC20.address);

  // Deploy Mock NFT
  const MockNFT = await ethers.getContractFactory("MockNFT");
  const mockNFT = await MockNFT.deploy();
  await mockNFT.deployed();
  console.log("✅ MockNFT deployed at:", mockNFT.address);

  // Deploy Mock Oracle (assuming no constructor args)
  const MockOracle = await ethers.getContractFactory("MockOracle");
  const mockOracle = await MockOracle.deploy();
  await mockOracle.deployed();
  console.log("✅ MockOracle deployed at:", mockOracle.address);

  // Deploy Lending Protocol
  const LendingProtocol = await ethers.getContractFactory("LendingProtocol");
  const lendingProtocol = await LendingProtocol.deploy(
    mockERC20.address,
    mockOracle.address
  );
  await lendingProtocol.deployed();
  console.log("✅ LendingProtocol deployed at:", lendingProtocol.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

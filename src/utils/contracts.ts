// src/utils/contracts.ts
import { ethers } from "ethers";
import MockNFTJson from "@/abis/MockNFT.json";
import MockERC20Json from "@/abis/MockERC20.json";
import MockOracleJson from "@/abis/MockOracle.json";
import LendingJson from "@/abis/LendingProtocol.json";
import deployed from "@/deployed.json";

export function getContracts(signerOrProvider: ethers.Signer | ethers.Provider) {
  const addresses = deployed as Record<string, string>;

  const nft = new ethers.Contract(
    addresses.MockNFT,
    // Hardhat artifact shape: { abi: [...] } or plain ABI; safeguard both
    (MockNFTJson as any).abi ?? MockNFTJson,
    signerOrProvider
  );

  const erc20 = new ethers.Contract(
    addresses.MockERC20,
    (MockERC20Json as any).abi ?? MockERC20Json,
    signerOrProvider
  );

  const oracle = new ethers.Contract(
    addresses.MockOracle,
    (MockOracleJson as any).abi ?? MockOracleJson,
    signerOrProvider
  );

  const lending = new ethers.Contract(
    addresses.LendingProtocol,
    (LendingJson as any).abi ?? LendingJson,
    signerOrProvider
  );

  return { nft, erc20, oracle, lending };
}

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";   // ✅ correct for v2
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    somnia: {
      url: process.env.RPC_URL || "",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;

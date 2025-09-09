/* hardhat.d.ts */
import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
  export interface HardhatRuntimeEnvironment {
    ethers: typeof import("ethers") & HardhatEthersHelpers;
  }
}

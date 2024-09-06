import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const REPORT_GAS = process.env.REPORT_GAS!;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      accounts: [PRIVATE_KEY],
      timeout: 2_147_483_647,
    },
    sepolia: {
      url: "https://rpc.sepolia.org",
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
      timeout: 2_147_483_647,
    },
    "metis-testnet": {
      url: "https://sepolia.metisdevops.link",
      chainId: 59902,
      accounts: [PRIVATE_KEY],
      timeout: 2_147_483_647,
    },
  },
  abiExporter: {
    path: "data/abi",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 4,
  },
  gasReporter: {
    enabled: REPORT_GAS == "1",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;

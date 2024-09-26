export const CHAIN_IDS = {
  METIS_TESTNET: 59902,
  BSC: 56,
  ETH: 1,
  SEPOLIA_TESTNET: 11155111,
  HARDHAT_LOCAL: 31337,
  BSC_TESTNET: 97,
};

export const chainList = {
  metisTestnet: {
    chainId: CHAIN_IDS.METIS_TESTNET,
    chainName: "Metis Sepolia Testnet",
    rpcUrls: ["https://sepolia.metisdevops.link"],
    nativeCurrency: {
      name: "METIS",
      symbol: "tMETIS",
      decimals: 18,
    },
    blockExplorerUrls: ["https://sepolia-explorer.metisdevops.link"],
  },

  bsc: {
    chainId: CHAIN_IDS.BSC,
    chainName: "BNB Smart Chain Mainnet",
    rpcUrls: ["https://bsc-dataseed1.bnbchain.org"],
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
  },

  bscTestnet: {
    chainId: CHAIN_IDS.BSC_TESTNET,
    chainName: "BNB Smart Chain Testnet",
    rpcUrls: ["https://endpoints.omniatech.io/v1/bsc/testnet/public"],
    nativeCurrency: {
      name: "BNB",
      symbol: "tBNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
};

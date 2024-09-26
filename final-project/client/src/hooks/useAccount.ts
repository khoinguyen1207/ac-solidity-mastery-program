import { CHAIN_IDS } from "@/constants/constants";
import useAuthStore from "@/hooks/useAuthStore";

export default function useAccount() {
  const { web3, setWalletInfo, setIsConnected } = useAuthStore();

  const addNetwork = async (chainId: number) => {
    if (!web3) return;
    await web3.provider?.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: web3.utils.toHex(chainId),
          chainName: "Metis Sepolia Testnet",
          rpcUrls: ["https://sepolia.metisdevops.link"],
          nativeCurrency: {
            name: "METIS",
            symbol: "tMETIS",
            decimals: 18,
          },
          blockExplorerUrls: ["https://sepolia-explorer.metisdevops.link"],
        },
      ],
    });
  };

  const getChainId = async () => {
    if (!web3) return;
    return parseInt((await web3.eth.getChainId()).toString());
  };

  const switchNetwork = async (chainId: number) => {
    if (!web3) return;
    const currentChainId = await getChainId();
    if (chainId === currentChainId) return;
    await web3.provider?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(chainId) }],
    });
  };

  const getWalletInfo = async () => {
    if (!web3) return;
    try {
      const address = await web3.eth.getAccounts();
      if (!address.length) throw new Error("No address found");
      const balanceOf = await web3.eth.getBalance(address[0]);
      setWalletInfo({
        address: address[0],
        balances: web3.utils.fromWei(balanceOf, "ether"),
      });
      setIsConnected(true);
    } catch (error) {
      console.log(error);
      setWalletInfo({ address: "", balances: 0 });
      setIsConnected(false);
    }
  };

  const connectWallet = async () => {
    try {
      if (!web3) return;
      await switchNetwork(CHAIN_IDS.HARDHAT_LOCAL);
      await web3.eth.requestAccounts();
    } catch (error: any) {
      console.log(error);
      if (error.code === 4902) {
        try {
          await addNetwork(CHAIN_IDS.HARDHAT_LOCAL);
          await switchNetwork(CHAIN_IDS.HARDHAT_LOCAL);
          await connectWallet();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const disconnectWallet = async () => {
    if (!web3) return;
    try {
      await web3.provider?.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
      setWalletInfo({ address: "", balances: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  return { connectWallet, disconnectWallet, getWalletInfo };
}

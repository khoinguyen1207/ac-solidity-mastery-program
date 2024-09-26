import { CHAIN_IDS, chainList } from "@/constants/chainlist";
import useAuthStore from "@/hooks/useAuthStore";

export default function useAccount() {
  const { web3, setWalletInfo, setIsConnected } = useAuthStore();

  const addNetwork = async () => {
    if (!web3) return;
    await web3.provider?.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...chainList.bscTestnet,
          chainId: web3.utils.toHex(CHAIN_IDS.BSC_TESTNET),
        },
      ],
    });
  };

  const getChainId = async () => {
    if (!web3) return;
    return parseInt((await web3.eth.getChainId()).toString());
  };

  const switchNetwork = async () => {
    if (!web3) return;
    const currentChainId = await getChainId();
    if (CHAIN_IDS.HARDHAT_LOCAL === currentChainId) return;
    await web3.provider?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(CHAIN_IDS.HARDHAT_LOCAL) }],
    });
  };

  const getWalletInfo = async () => {
    if (!web3) return;
    try {
      const address = await web3.eth.getAccounts();
      if (!address.length) {
        setWalletInfo({ address: "", balances: 0 });
        setIsConnected(false);
        return;
      }
      const balanceOf = await web3.eth.getBalance(address[0]);
      setWalletInfo({
        address: address[0],
        balances: web3.utils.fromWei(balanceOf, "ether"),
      });
      setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!web3) return;
      await switchNetwork();
      await web3.eth.requestAccounts();
    } catch (error: any) {
      console.log(error);
      if (error.code === 4902) {
        try {
          await addNetwork();
          await switchNetwork();
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

import { CHAIN_IDS } from "@/constants/constants";
import useAuthStore from "@/hooks/useAuthStore";

export default function useAccount() {
  const { web3, setWalletInfo } = useAuthStore();

  const switchNetwork = async (chainId: number) => {
    if (!web3) return;
    const currentChain = (await web3.eth.getChainId()).toString();
    if (chainId === parseInt(currentChain)) return;
    try {
      await web3.eth.requestManager.send({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });
    } catch (error) {
      console.log(error);
      throw new Error("Network switch failed");
    }
  };

  const getWalletInfo = async () => {
    if (!web3) return;
    try {
      const address = await web3.eth.getAccounts();
      if (address.length === 0) {
        setWalletInfo({ address: "", balances: 0 });
        return;
      }
      const balanceOf = await web3.eth.getBalance(address[0]);
      setWalletInfo({
        address: address[0],
        balances: parseFloat(web3.utils.fromWei(balanceOf, "ether")),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connect = async () => {
    if (!web3) return;
    try {
      await switchNetwork(CHAIN_IDS.METIS_TESTNET);
      const res = await web3.eth.requestAccounts();
      const balanceOf = await web3.eth.getBalance(res[0]);
      setWalletInfo({
        address: res[0],
        balances: parseFloat(web3.utils.fromWei(balanceOf, "ether")),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    if (!web3) return;
    try {
      await web3.eth.requestManager.send({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
      setWalletInfo({ address: "", balances: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  return { connect, disconnect, getWalletInfo };
}

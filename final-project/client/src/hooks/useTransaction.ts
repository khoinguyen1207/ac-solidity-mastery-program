// import { contractABI } from "@/constants/constants";
import { contractABI, contractAddress } from "@/constants/constants";
import Web3 from "web3";

export default function useTransaction() {
  const mintNFT = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log(contract);

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const res = await contract.methods.name().call();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return { mintNFT };
}

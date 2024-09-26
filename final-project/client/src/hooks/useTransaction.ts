// import { contractABI } from "@/constants/constants";
import { contractABI, contractAddress } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import useAccount from "@/hooks/useAccount";
import Web3 from "web3";

export default function useTransaction() {
  const { toast } = useToast();
  const { getWalletInfo } = useAccount();

  const mintNFT = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log(contract);
    const accounts = await web3.eth.getAccounts();
    try {
      const event = await contract.getPastEvents("MintPlayer", {
        filter: accounts[0],
        fromBlock: 0,
        toBlock: "latest",
      });
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const accounts = await web3.eth.getAccounts();
    //   console.log(accounts[0]);
    //   const tx = {
    //     to: accounts[0],
    //     name: "Ronaldo",
    //     rarity: "2",
    //     tokenURI: "https://icetoday.net/wp-content/uploads/2018/07/C.jpg",
    //   };
    //   const res = await contract.methods.mintTo(tx.to, tx.name, tx.rarity, tx.tokenURI).send({ from: accounts[0] });
    //   console.log(res);
    //   toast({
    //     title: "NFT Minted",
    //     description: "Your NFT has been minted successfully",
    //     variant: "success",
    //   });
    //   getWalletInfo();
    //   web3.eth.transaction

    // } catch (error) {
    //   console.log(error);
    // }
  };

  return { mintNFT };
}

import { NFTType } from "./../types/nft.type";
// import { contractABI } from "@/constants/constants";
import { contractABI, contractAddress } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import useAccount from "@/hooks/useAccount";
import useAuthStore from "@/hooks/useAuthStore";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function useTransaction() {
  const { toast } = useToast();
  const { getWalletInfo } = useAccount();
  const { web3 } = useAuthStore();
  const [nfts, setNfts] = useState<NFTType[]>([]);

  const getNfts = async () => {
    if (!web3) return;
    try {
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log(contract);
      const total = Number(await contract.methods.totalSupply().call());
      const nftList = [];
      for (let i = 0; i < total; i++) {
        const nftId = Number(await contract.methods.tokenByIndex(i).call());
        const nftInfo = (await contract.methods.getPlayer(nftId).call()) as NFTType;
        nftList.push(nftInfo);
      }
      console.log(nftList);
      const nftListFormatted = nftList.map((nft) => {
        return {
          name: nft.name,
          rarity: nft.rarity,
          tokenURI: nft.tokenURI,
          user: nft.user,
        };
      });
      setNfts(nftListFormatted);
    } catch (error) {
      console.log(error);
    }
  };

  const mintNFT = async () => {
    if (!web3) return;
    const web2 = new Web3(window.ethereum);
    const contract = new web2.eth.Contract(contractABI, contractAddress);
    console.log(contract);

    try {
      const accounts = await web2.eth.getAccounts();
      console.log(accounts[0]);
      const tx = {
        to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        name: "Kevin De Bruyne",
        rarity: "2",
        tokenURI: "https://st.depositphotos.com/43708092/59916/i/450/depositphotos_599162692-stock-photo-kevin-bruyne-manchester-city.jpg",
      };
      const resTx = await contract.methods.mintTo(tx.to, tx.name, tx.rarity, tx.tokenURI).send({ from: accounts[0] });
      console.log(resTx);
      toast({
        title: "NFT Minted",
        description: "Your NFT has been minted successfully",
        variant: "success",
      });
      getWalletInfo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNfts();
  }, [web3]);

  return { mintNFT, nfts };
}

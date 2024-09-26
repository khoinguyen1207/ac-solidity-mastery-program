import useAccount from "@/hooks/useAccount";
import useAuthStore from "@/hooks/useAuthStore";
import React, { useEffect } from "react";
import Web3 from "web3";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { web3, setWeb3 } = useAuthStore();
  const { getWalletInfo, disconnectWallet } = useAccount();

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }, [setWeb3]);

  useEffect(() => {
    if (!web3) return;
    getWalletInfo();

    web3.provider?.on("accountsChanged", async (accounts: string[]) => {
      getWalletInfo();
    });

    web3.provider?.on("chainChanged", () => {
      disconnectWallet();
    });
  }, [web3]);
  return <div>{children}</div>;
}

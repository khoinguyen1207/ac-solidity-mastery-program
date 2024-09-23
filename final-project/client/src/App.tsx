import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (!connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      // Disconnect the wallet
      (window as any).ethereum.selectedAddress = null;
      setConnected(false);
      setWalletAddress("");
    }
  };

  const disconnectWallet = () => {};

  return (
    <>
      <div>Hello</div>
      <h4>Address: {walletAddress}</h4>
      <button
        onClick={() => connectWallet()}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Connect
      </button>
      <button
        onClick={() => disconnectWallet()}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Disconnect
      </button>
    </>
  );
}

export default App;

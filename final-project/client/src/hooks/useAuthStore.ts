import { create } from "zustand";
import { Web3 } from "web3";
import { WalletInfo } from "@/types/account.type";

interface State {
  web3: Web3 | null;
  walletInfo: WalletInfo;
  isConnected: boolean;
}

interface Action {
  setWeb3: (web3: Web3) => void;
  setWalletInfo: (walletInfo: WalletInfo) => void;
  setIsConnected: (isConnected: boolean) => void;
}

const initialState: State = {
  web3: null,
  walletInfo: {
    address: "",
    balances: 0,
  },
  isConnected: false,
};

const useAuthStore = create<State & Action>((set) => ({
  ...initialState,
  setWeb3: (web3) => set({ web3 }),
  setWalletInfo: (payload: WalletInfo) =>
    set({
      walletInfo: {
        address: payload.address,
        balances: payload.balances,
      },
    }),
  setIsConnected: (isConnected) => set({ isConnected }),
}));

export default useAuthStore;

import { Button } from "@/components/ui/button";
import useAccount from "@/hooks/useAccount";
import useAuthStore from "@/hooks/useAuthStore";

function App() {
  const { walletInfo } = useAuthStore();
  const { connect, disconnect } = useAccount();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-slate-200 text-center p-6 rounded-md mx-auto w-[50%]">
        <div className="grid gap-4">
          <h4 className="break-words grid grid-cols-1">Address: {walletInfo.address}</h4>
          <h4>Balance: {walletInfo.balances}</h4>
          {walletInfo.address ? (
            <Button onClick={disconnect} size="lg">
              Disconnect
            </Button>
          ) : (
            <Button onClick={connect} size="lg">
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

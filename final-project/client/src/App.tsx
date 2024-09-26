import { Button } from "@/components/ui/button";
import useAccount from "@/hooks/useAccount";
import useAuthStore from "@/hooks/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Coins, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useTransaction from "@/hooks/useTransaction";

function App() {
  const { walletInfo, isConnected } = useAuthStore();
  const { connectWallet, disconnectWallet } = useAccount();
  const { mintNFT } = useTransaction();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 mr-2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl font-bold">NFT Minter</span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex">
              <a href="#" className="text-sm px-3 font-medium">
                Home
              </a>
              <a href="#" className="text-sm px-3 font-medium">
                Gallery
              </a>
              <a href="#" className="text-sm px-3 font-medium">
                About
              </a>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <a href="#">Home</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#">Gallery</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#">About</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!isConnected ? (
              <Button onClick={connectWallet} size="lg">
                <Wallet className="mr-2 h-4 w-4" /> Connect
              </Button>
            ) : (
              <Button onClick={disconnectWallet} size="lg">
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow my-6 container mx-auto p-4">
        <Card className="w-full md:w-[80%] mx-auto">
          <CardHeader>
            <CardTitle>Wallet Information</CardTitle>
            <CardDescription>Your current wallet status</CardDescription>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Address:</span>
                  <span className="truncate ml-2">{walletInfo.address}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Balance:</span>
                  <span className="truncate ml-2">{walletInfo.balances} ETH</span>
                </div>
              </div>
            ) : (
              <p>Please connect your wallet to view information.</p>
            )}
          </CardContent>
        </Card>
        {isConnected && (
          <Card className="w-full md:w-[80%] mx-auto mt-8">
            <CardHeader>
              <CardTitle>Mint NFT</CardTitle>
              <CardDescription>Create your unique NFT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 items-center">
                <div className=" rounded-md h-[400px]">
                  <img
                    src="https://4kwallpapers.com/images/wallpapers/black-myth-wukong-1920x1200-17970.jpeg"
                    alt="nft"
                    className="rounded-md overflow-hidden w-full h-full"
                  />
                </div>
                <div className="grid gap-2">
                  <h2 className="text-base font-medium">23/100 minted</h2>
                  <h1 className="text-3xl font-bold">Wukong NFT</h1>
                  <p className="text-slate-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et quam in nunc consectetur adipiscing elit consectetur
                    adipiscing elit consectetur adipiscing elit consectetur adipiscing elit
                  </p>
                  <div className="flex justify-between py-3 text-lg">
                    <div>On sale</div>
                    <div>
                      4.89 ETH
                      <div>($24.566)</div>
                    </div>
                  </div>
                  <Button className="w-fit ml-auto" size="lg" onClick={() => mintNFT()}>
                    <Coins className="mr-2 h-4 w-4" /> Mint NFT
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default App;

import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account: ", owner.address);
  console.log("Account balance: ", (await owner.provider.getBalance(owner)).toString());

  const deploy = async () => {
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(1725605100);

    console.table({
      lock: await lock.getAddress(),
    });
  };

  await deploy();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account: ", owner.address);
  console.log("Account balance: ", (await owner.provider.getBalance(owner)).toString());

  const deploy = async () => {
    const Calculator = await ethers.getContractFactory("Calculator");
    const calculator = await Calculator.deploy();

    console.table({
      calculator: await calculator.getAddress()
    });
  };

  // const deployCalculateExpenseTracker = async () => {
  //   const CalculateExpenseTracker = await ethers.getContractFactory("ExpenseTracker");
  //   const calculateExpenseTracker = await CalculateExpenseTracker.deploy();

  //   console.table({
  //     calculateExpenseTracker: await calculateExpenseTracker.getAddress()
  //   });
  // };

  // const deployInheritace = async () => {
  //   const Inheritance = await ethers.getContractFactory("PolymorphismBird");
  //   const inheritance = await Inheritance.deploy();

  //   console.table({
  //     inheritance: await inheritance.getAddress()
  //   });
  // };

  await deploy();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

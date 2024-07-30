<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 4

## 📄 Task 1: Add a new condition in the constructor of the Lock smart contract. The locking value must be greater than or equal to 0.1 Metis

### 💻 Solution

```solidity
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    error InvalidUnlockTime(uint unlockTime, uint currentTime);
    error InsufficientLockAmount(uint amount);
    event Withdrawal(uint amount, uint when);

    modifier onlyOwner() {
        require(msg.sender == owner, "You aren't the owner");
        _;
    }

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        require(msg.value >= 0.1 ether, "Locking value must be at least 0.1 Metis");

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public onlyOwner {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        // require(block.timestamp >= unlockTime, "You can't withdraw yet");
        // require(msg.sender == owner, "You aren't the owner");

        if (block.timestamp < unlockTime) {
            revert InvalidUnlockTime(unlockTime, block.timestamp);
        }

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}

```

- Config deploy file (script/deploy.ts)

```js
import "@nomicfoundation/hardhat-ethers"
import { ethers } from "hardhat"

const UNLOCK_TIME = 1722311040
const LOCKED_AMOUNT = 100000000000000000n

async function main() {
  const [owner] = await ethers.getSigners()
  console.log("Deploying contracts with the account: ", owner.address)
  console.log("Account balance: ", (await owner.provider.getBalance(owner)).toString())

  const deployLock = async () => {
    const Lock = await ethers.getContractFactory("Lock")
    const lock = await Lock.deploy(UNLOCK_TIME, {
      value: LOCKED_AMOUNT,
    })

    console.table({
      lock: await lock.getAddress(),
    })
  }

  await deployLock()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

- Network Config (hardhat.config.ts)

```js
networks: {
    "metis-testnet": {
        url: "https://sepolia.metisdevops.link",
        chainId: 59902,
        accounts: [PRIVATE_KEY],
        timeout: 2_147_483_647,
    },
},
```

## 📄 Task 2: Deploy to Metis L2

- 📌 Link deployed: [Block hash](https://sepolia-explorer.metisdevops.link/tx/0x6a92a2d6ba94057ee98d711914c6039b7c7e14a92249483387532d5cb4c35a61)

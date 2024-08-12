<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 9

## 💥 Intro

Do you remember the BasicCalculator and AdvancedCalculator contracts? Rewrite all functions: add, substract, multiply, divide and performOperation by using Math library.

## 💬 Task 1: Add multiply and divide functions to Math library

### 💡 Solution

```solidity
library Math {
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        return a - b;
    }

    function multiply(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function divide(uint256 a, uint256 b) internal pure returns (uint256) {
        return  a / b;
    }
}
```

## 💬 Task 2: Implement multiply and divide function in LibraryCalculator

```solidity
contract LibraryCalculator {
    uint256 private result;
    using Math for uint256; // Importing library

    function getResult() public view returns (uint256) {
        return result;
    }

    function add(uint256 a, uint256 b) public {
        result = a.add(b);
    }

    function subtract(uint256 a, uint256 b) public {
        result = a.subtract(b);
    }

    function multiply(uint256 a, uint256 b) public {
        result = a.multiply(b);
    }

    function divide(uint256 a, uint256 b) public  {
        result = a.divide(b);
    }
}
```

## 💬 Task 3: Implement performOperation by using Math library

```solidity
function performOperations(uint256 a, uint256 b, uint8 operation) public {
    if (operation == 1) {
        add(a, b);
    } else if (operation == 2) {
        subtract(a, b);
    } else if (operation == 3) {
        multiply(a, b);
    } else if (operation == 4) {
        divide(a, b);
    } else {
        revert("Invalid operation");
    }
}
```

## 💬 Task 4: Deploy and test the contract

- Config deploy file (script/deploy.ts)

```js
const deployLibraryCalculator = async () => {
  const LibraryCalculator = await ethers.getContractFactory("LibraryCalculator");
  const libraryCalculator = await LibraryCalculator.deploy();

  console.table({
    libraryCalculator: await libraryCalculator.getAddress()
  });
};

await deployLibraryCalculator();
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

- Config script (package.json)

```json
{
  "scripts": {
    "deploy:metis-script": "hardhat run scripts/deploy.ts --network metis-testnet"
  }
}
```

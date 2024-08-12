<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 10

## 💥 Intro

Create a Utility Library - StringUtils.sol

## 💬 Task 1: Create a new library StringUtils with functions to manipulate strings

## 💬 Task 2: Implement functions like concatenate and compare.

### 💡 Solution task 1 + 2

```solidity
library StringUtils {
    function compareStrings(string memory _a, string memory _b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }

    function concatenateStrings(string memory _a, string memory _b) internal pure returns (string memory) {
        return string(abi.encodePacked(_a, _b));
    }

    function lengthStrings(string memory _a) internal pure returns (uint) {
        return bytes(_a).length;
    }
}
```

## 💬 Task 3: Create a contract - StringOperations.sol that uses the StringUtils library

```solidity
contract StringOperations {
    using StringUtils for string; // Importing library

    function compareStrings(string memory _a, string memory _b) public pure returns (bool) {
        return _a.compareStrings(_b);
    }

    function concatenateStrings(string memory _a, string memory _b) public pure returns (string memory) {
        return _a.concatenateStrings(_b);
    }

    function lengthStrings(string memory _a) public pure returns (uint) {
        return _a.lengthStrings();
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

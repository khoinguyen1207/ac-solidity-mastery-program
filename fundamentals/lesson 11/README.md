<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 11

## 💥 Intro

Create and use Interfaces

## 💬 Task 1: Create a interface IStorage with function **store** and **retrieve**

### 💡 Solution

```solidity
interface IStorage {
    function store(uint256 _data) external;
    function retrieve() external view returns(uint256);
}
```

## 💬 Task 2: Implement the IStorage interface in a contract SimpleStorage

```solidity
contract SimpleStorage is IStorage {
    uint256 private storedData;

    function store(uint256 _data) public override {
        storedData = _data;
    }

    function retrieve() public view override returns(uint256) {
        return storedData;
    }
}
```

## 💬 Task 3: Deploy and test the contract

- Config deploy file (script/deploy.ts)

```js
const deploySimpleStorage = async () => {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  console.table({
    simpleStorage: await simpleStorage.getAddress()
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

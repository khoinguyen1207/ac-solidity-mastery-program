<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 12

## 💥 Intro

Create and use Abstract Contract

## 💬 Task 1: Create an abstract contract AbstractStorage with a concrete **_store_** function and an abstract **_retrieve_** function

## 💬 Task 2: Implement the **_AbstractStorage_** in a contract **_SimpleStorage_**

### 💡 Solution

```solidity
abstract contract AbstractStorage{
    uint256 internal storedData;

    function store(uint256 _data) public virtual{
        storedData = _data;
    }

    function retrieve() public view virtual returns(uint256);
}


contract SimpleStorage is AbstractStorage {
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

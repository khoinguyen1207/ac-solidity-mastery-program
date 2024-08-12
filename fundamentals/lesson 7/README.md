<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 7

## 💥 Intro

```solidity
contract SimpleStorage {
    uint256 public storedData;

    event DataStored(address indexed sender, uint256 data);

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
```

## 💬 Task 1: Modify the contract to include another event DataRetrieved that logs when the get function is called

### 💡 Solution

```solidity
contract SimpleStorage {
    uint256 public storedData;

    event DataStored(address indexed sender, uint256 data);
    event DataRetrieved(address indexed sender, uint256 data);

    function set(uint256 x) public {
        emit DataRetrieved(msg.sender, x);
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
```

## 💬 Task 2: Deploy and interact with modified contract to trigger and view the event

- Config deploy file (script/deploy.ts)

```js
const deploySimpleStorage = async () => {
  const SimpleStorage = await ethers.getContractFactory("ExpenseTracker");
  const simpleStorage = await SimpleStorage.deploy();

  console.table({
    simpleStorage: await simpleStorage.getAddress()
  });
};

await deploySimpleStorage();
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

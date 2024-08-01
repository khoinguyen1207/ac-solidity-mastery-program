<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 6

## 💬 Task 1: Implement getTotalExpense

### 💡 Solution

```solidity
contract ExpenseTracker {
    struct Expense {
        address user;
        string description;
        uint256 amount;
    }

    Expense[] public expenses;

    constructor() {
        expenses.push(Expense(msg.sender, "Groceries", 50));
        expenses.push(Expense(msg.sender, "Transportation", 20));
        expenses.push(Expense(msg.sender, "Dining out", 30));
    }

    function addExpense(string memory _description, uint256 _amount) public {
        expenses.push(Expense(msg.sender, _description, _amount));
    }

    function getTotalExpenses(address _user) public view returns (uint256) {
        uint totalExpense = 0;
        for (uint i = 0; i < expenses.length; i++) {
            if(expenses[i].user == _user) {
                totalExpense += expenses[i].amount;
            }
        }
        return totalExpense;
    }
}
```

## 💬 Task 2: Deploy to Metis L2

- Config deploy file (script/deploy.ts)

```js
const deployCalculateExpenseTracker = async () => {
  const CalculateExpenseTracker = await ethers.getContractFactory("ExpenseTracker")
  const calculateExpenseTracker = await CalculateExpenseTracker.deploy()

  console.table({
    calculateExpenseTracker: await calculateExpenseTracker.getAddress(),
  })
}

await deployCalculateExpenseTracker()
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

- 📌 Link deployed: [Block hash](https://sepolia-explorer.metisdevops.link/tx/0x43e66e0d622b6ec20f01c15d5adb22184435bd82d9498a618bcd6d6ab143191a)

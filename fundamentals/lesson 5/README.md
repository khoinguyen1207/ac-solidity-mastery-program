<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 5

## 💥 Intro

```solidity
contract BasicCalculator {
    uint256 result;

    function add(uint256 a, uint256 b) public {
        result = a + b;
    }

    function subtract(uint256 a, uint256 b) public {
        result = a - b;
    }
}

contract AdvancedCalculator is BasicCalculator {
    function multiply(uint256 a, uint256 b) public {
        result = a * b;
    }

    function divide(uint256 a, uint256 b) public  {
        result = a / b;
    }

    function performOperations(uint256 a, uint256 b, uint8 operation) public {}
}
```

## 💬 Task 1: Implement operation function, where the operation can be (1,2,3,4) corresponding to (+,-,\*,/)

### 💡 Solution

```solidity
contract BasicCalculator {
    uint256 result;

    function add(uint256 a, uint256 b) public {
        result = a + b;
    }

    function subtract(uint256 a, uint256 b) public {
        result = a - b;
    }
}

contract AdvancedCalculator is BasicCalculator {

    modifier validateOperation (uint8 operation) {
        require(operation >= 1 && operation <= 4, "Operation must be between 1 and 4");
        _;
    }

    function multiply(uint256 a, uint256 b) public {
        result = a * b;
    }

    function divide(uint256 a, uint256 b) public  {
        require(b != 0, "You can't divide by zero");
        result = (a * 10**18) / b;
    }

    function performOperations(uint256 a, uint256 b, uint8 operation) validateOperation(operation) public {
        if (operation == 1) {
            add(a, b);
        } else if (operation == 2) {
            subtract(a, b);
        } else if (operation == 3) {
            multiply(a, b);
        } else if (operation == 4) {
            divide(a, b);
        }
    }
}
```

## 💬 Task 2: No one from outside can access any function of both the BasicCalculator and AdvancedCalculator smart contract

```solidity
contract BasicCalculator {
    uint256 result;

    function add(uint256 a, uint256 b) internal {
        result = a + b;
    }

    function subtract(uint256 a, uint256 b) internal {
        result = a - b;
    }
}

contract AdvancedCalculator is BasicCalculator {

    modifier validateOperation (uint8 operation) {
        require(operation >= 1 && operation <= 4, "Operation must be between 1 and 4");
        _;
    }

    function multiply(uint256 a, uint256 b) private {
        result = a * b;
    }

    function divide(uint256 a, uint256 b) private  {
        require(b != 0, "You can't divide by zero");
        result = (a * 10**18) / b;
    }

    function performOperations(uint256 a, uint256 b, uint8 operation) validateOperation(operation) private {
        if (operation == 1) {
            add(a, b);
        } else if (operation == 2) {
            subtract(a, b);
        } else if (operation == 3) {
            multiply(a, b);
        } else if (operation == 4) {
            divide(a, b);
        }
    }
}
```

## 💬 Task 3: Write function to get the Result

```solidity
contract AdvancedCalculator is BasicCalculator {

    // ...Logic
    function getResult() public view returns (uint256) {
        return result;
    }
}
```

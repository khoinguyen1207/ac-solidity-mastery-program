<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 13

## 💬 Try to fix the withdraw() function on VulnerableReentrancy contract

## 💬 Deploy and verify on Metis L2

### 💡 Solution

```solidity
contract VulnerableReentrancy {
    mapping(address => uint) public balances;

    function deposit() public payable {
        require(msg.value >= 0.01 ether, "Deposit must be greater than 0.01 ether");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Update the state before making the external call
        balances[msg.sender] -= _amount;

        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }
}
```

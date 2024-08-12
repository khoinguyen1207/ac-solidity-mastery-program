<h1 align="center">Solidity Mastery Program</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Hardhat-FFCB1F?style=for-the-badge&logo=ethereum&logoColor=black"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Blockchain-000000?style=for-the-badge&logo=blockchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bitcoin-E2761B?style=for-the-badge&logo=bitcoin&logoColor=white"/>
</p>

# Exercies 8

## 💥 Intro

```solidity
pragma solidity ^0.8.24;

contract PolymorphismAnimal {
   function play() public pure virtual returns (string memory) {
       return "...";
   }

   function play(string memory _game) public pure virtual returns (string memory) {
       return _game;
   }

   function sound() public pure virtual returns (string memory) {
       return "The animal is making a sound";
   }
}

contract PolymorphismDog is PolymorphismAnimal {
   function sound() public pure override returns (string memory) {
       return "Barking";
   }
}

contract PolymorphismCat is PolymorphismAnimal {
   function sound() public pure override returns (string memory) {
       return "Meowing";
   }
}
```

## 💬 Task 1: Create a new derived contract Bird that inherits from Animal

## 💬 Task 2: Override the sound() method to return "Chirping"

## 💬 Task 3: Deploy the Bird contract

## 💬 Task 4: Call the sound() function

### 💡 Solution

```solidity
contract PolymorphismAnimal {
   function play() public pure virtual returns (string memory) {
       return "...";
   }

   function play(string memory _game) public pure virtual returns (string memory) {
       return _game;
   }

   function sound() public pure virtual returns (string memory) {
       return "The animal is making a sound";
   }
}

contract PolymorphismDog is PolymorphismAnimal {
   function sound() public pure override returns (string memory) {
       return "Barking";
   }
}

contract PolymorphismCat is PolymorphismAnimal {
   function sound() public pure override returns (string memory) {
       return "Meowing";
   }
}

contract PolymorphismBird is PolymorphismAnimal {
   function sound() public pure override returns (string memory) {
       return "Chirping";
   }
}
```

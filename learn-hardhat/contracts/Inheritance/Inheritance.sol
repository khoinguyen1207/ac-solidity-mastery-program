// SPDX-License-Identifier: MIT

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

contract PolymorphismBird is PolymorphismAnimal {
   function sound() public pure override returns (string memory) {
       return "Chirping";
   }
}

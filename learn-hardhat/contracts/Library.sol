// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;


library Math {
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        return a - b;
    }

    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }

    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        require(b != 0, "You can't divide by zero");
        return a / b;
    }
}


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
}
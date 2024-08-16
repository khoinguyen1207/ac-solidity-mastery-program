// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

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

    function getResult() public view returns (uint256) {
        return result;
    }
}
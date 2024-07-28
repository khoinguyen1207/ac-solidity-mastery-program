// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Calculator {
    int256 private result;

    modifier check_b(int256 b) {
        require(b != 0, "You can't divide by zero");
        _;
    }

    function getResult() public view returns (int256) {
        return result;
    }

    function add(int256 a, int256 b) public {
        result = a + b;
    }

    function subtract(int256 a, int256 b) public {
        result = a - b;
    }

    function multiply(int256 a, int256 b) public {
        result = a * b;
    }

    function divide(int256 a, int256 b) public check_b(b) {
        result = (a * 10**18) / b;
    }
}
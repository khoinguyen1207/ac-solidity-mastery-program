// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;


library Math {
    function multiply(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function divide(uint256 a, uint256 b) internal pure returns (uint256) {
        return  a / b;
    }

}

contract Calculator {
    uint256 private result;

    using Math for uint256;

    modifier check_b(uint256 b) {
        require(b != 0, "You can't divide by zero");
        _;
    }

    function getResult() public view returns (uint256) {
        return result;
    }

    function add(uint256 a, uint256 b) public {
        result = a + b;
    }

    function subtract(uint256 a, uint256 b) public {
        result = a - b;
    }

    function multiply(uint256 a, uint256 b)  public {
        result = a.multiply(b);
    }

    function divide(uint256 a, uint256 b) public check_b(b) {
        result = a.divide(b);
    }
}


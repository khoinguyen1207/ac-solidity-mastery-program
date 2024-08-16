// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract VulnerableReentrancy {
    mapping(address => uint) public balances;

    function deposit() public payable {
        require(msg.value >= 0.01 ether, "Deposit must be greater than 0.01 ether");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Failed to send Ether");
        balances[msg.sender] -= _amount;
    }
}
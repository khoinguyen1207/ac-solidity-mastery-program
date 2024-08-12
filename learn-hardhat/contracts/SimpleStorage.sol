// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 public storedData;

    event DataStored(address indexed sender, uint256 data);
    event DataRetrieved(address indexed sender, uint256 data);

    function set(uint256 x) public {
        emit DataRetrieved(msg.sender, x);
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}

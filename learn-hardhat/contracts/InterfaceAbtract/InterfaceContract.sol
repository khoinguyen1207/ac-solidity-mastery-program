// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface IStorage {
    function store(uint256 _data) external;
    function retrieve() external view returns(uint256);
}

contract SimpleStorage is IStorage {
    uint256 private storedData;

    function store(uint256 _data) public override{
        storedData = _data;
    }

    function retrieve() public view override returns(uint256) {
        return storedData;
    }
}


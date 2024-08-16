// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

abstract contract AbstractStorage{
    uint256 internal storedData;

    function store(uint256 _data) public virtual{ 
        storedData = _data;
    }

    function retrieve() public view virtual returns(uint256);
}


contract SimpleStorage is AbstractStorage {
    function retrieve() public view override returns(uint256) {
        return storedData;
    }
}


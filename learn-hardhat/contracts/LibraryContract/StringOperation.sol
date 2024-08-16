// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;


library StringUtils {
    function compareStrings(string memory _a, string memory _b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }

    function concatenateStrings(string memory _a, string memory _b) internal pure returns (string memory) {
        return string(abi.encodePacked(_a, _b));
    }

    function lengthStrings(string memory _a) internal pure returns (uint) {
        return bytes(_a).length;
    }

    function getCharAt(string memory _str, uint index) internal pure returns (string memory) {
        require(index < bytes(_str).length, "Index out of bounds");
        return string(abi.encodePacked(bytes(_str)[index]));
    }
}


contract StringOperations {
    using StringUtils for string; // Importing library

    function compareStrings(string memory _a, string memory _b) public pure returns (bool) {
        return _a.compareStrings(_b);
    }

    function concatenateStrings(string memory _a, string memory _b) public pure returns (string memory) {
        return _a.concatenateStrings(_b);
    }

    function lengthStrings(string memory _a) public pure returns (uint) {
        return _a.lengthStrings();
    }

    function getCharAtStrings(string memory _str, uint index) public pure returns (string memory) {
        return _str.getCharAt(index);
    }
}
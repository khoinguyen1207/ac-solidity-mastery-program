// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BabyDogToken is ERC20, Ownable {
    uint256 private initialSupply = 1000000 * (10 ** decimals());
    mapping(address => bool) private whiteList;

    // Unlock time to claim token is 1632960000
    uint256 private unclockTime = 1632960000;

    // Each token is 0.00001 metis = 0.00001 * 10^18 = 10^13
    uint256 private price = 10000000000000;

    constructor() ERC20("BabyDog", "BBD") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require((ERC20.totalSupply() + amount <= initialSupply), "BabyDogToken: total supply exceeded");
        _mint(to, amount);
    }

    function addToWhiteList(address _address) external onlyOwner {
        whiteList[_address] = true;
    }

    function removeFromWhiteList(address _address) external onlyOwner {
        whiteList[_address] = false;
    }

    function isWhiteListed(address _address) public view returns (bool) {
        return whiteList[_address];
    }
}

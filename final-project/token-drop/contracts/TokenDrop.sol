// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BabyDogToken is ERC20, Ownable {
    uint256 private initialSupply = 1000000 * (10 ** decimals()); // 1 million tokens
    mapping(address => bool) private whiteList;
    mapping(address => uint256) private claimedList;

    // 15/9/2024 00:00:00    
    uint256 private startTime = 1726333200; 

    // 25/9/2024 00:00:00
    uint256 private endTime = 1726765200; 

    // Max claim = 0.1 metis / person = 0.1 * 10^18 = 10^17
    uint256 private maxClaim = 100000000000000000;

    // Each token is 0.00001 metis = 0.00001 * 10^18 = 10^13
    uint256 private price = 10000000000000;

    constructor() ERC20("BabyDog", "BBD") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    modifier maxClaimLimit(uint256 amount) {
        uint256 claimedAmount = claimedList[msg.sender];
        require(claimedAmount + (amount * price) <= maxClaim, "Exceed max claim");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require((ERC20.totalSupply() + amount <= initialSupply), "Exceed initial supply"); 
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

    function allowListClaim(uint256 amount) external maxClaimLimit(amount) {
        require(whiteList[msg.sender], "You are not in the whitelist");
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Not in claim time");
        claimedList[msg.sender] += amount * price;
        _transfer(owner(), msg.sender, amount * (10 ** decimals()));
    }

    function publicClaim(uint256 amount) external maxClaimLimit(amount) {
        require(block.timestamp >= endTime, "Not in claim time");
        claimedList[msg.sender] += amount * price;
        _transfer(owner(), msg.sender, amount * (10 ** decimals()));
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenDrop is ERC20, Ownable {
    uint256 private initialSupply = 1000000 * (10 ** decimals()); // 1 million tokens
    mapping(address => bool) private whiteList;
    mapping(address => uint256) private userClaims;

    // 15/9/2024 00:00:00    
    uint256 private startTime = 1726333200; 

    // 25/9/2024 00:00:00
    uint256 private endTime = 1726765200; 

    // Max claim 100 tokens
    uint256 public maxClaim = 100;

    // Each token is 0.001 metis = 0.001 * 10^18 = 10^15
    uint256 public price = 1_000_000_000_000_000;

    constructor() ERC20("BabyDog", "BBD") Ownable(msg.sender) {
        _mint(address(this), initialSupply);
    }

    modifier maxClaimLimit(uint256 tokenAmount) {
        uint256 newTotalClaim = userClaims[msg.sender] + tokenAmount;
        require(newTotalClaim <= maxClaim, "Claim exceeds maximum allowed amount");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
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

    function allowListClaim(uint256 tokenAmount) external maxClaimLimit(tokenAmount) {
        require(isWhiteListed(msg.sender), "You are not in the whitelist");
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Not in claim time");
        require(tokenAmount > 0, "Amount must be greater than 0");

        userClaims[msg.sender] += tokenAmount;
        _mint(msg.sender, tokenAmount * (10 ** decimals()));
    }

    function publicClaim(uint256 amount) public {
        require(block.timestamp >= endTime, "Not in claim time");
        buyToken(amount);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }

    function buyToken(uint256 tokenAmount) public payable {
        require(block.timestamp >= endTime, "You can't buy token now");
        require(tokenAmount > 0, "You need to buy at least 1 token");

        uint256 requiredValue = (tokenAmount * price) / (10 ** decimals());
        require(msg.value == requiredValue, "Incorrect amount of Metis sent");

        _transfer(address(this), msg.sender, tokenAmount * (10 ** decimals()));
    }
}

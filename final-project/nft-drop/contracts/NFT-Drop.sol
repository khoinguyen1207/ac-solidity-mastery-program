// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721, Ownable {
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public mintPrice = 0.001 ether;
    bool public isMintEnabled;
    mapping(address => uint256) public mintedWallets;

    constructor(address _initialAddress) payable ERC721("SimpleNFT", "SNFT") Ownable(_initialAddress) {
        maxSupply = 100;
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }
    
    function setMintEnabled() public onlyOwner {
        isMintEnabled = !isMintEnabled;
    }

    // function awardItem(address player, string memory tokenURI)
    //     public
    //     returns (uint256)
    // {
    //     uint256 tokenId = totalSupply++;
    //     _mint(player, tokenId);
    //     _setTokenURI(tokenId, tokenURI);
    //     return tokenId;
    // }

    function mint() external payable {
        require(isMintEnabled, "Minting is disabled");
        require(mintedWallets[_msgSender()] < 1, "Acceed mint per wallet");
        require(msg.value == mintPrice, "Incorrect value");
        require(totalSupply < maxSupply, "Sold out");

        mintedWallets[_msgSender()] += 1;
        totalSupply += 1;
        uint256 tokenId = totalSupply;
        _safeMint(_msgSender(), tokenId);
    }
}
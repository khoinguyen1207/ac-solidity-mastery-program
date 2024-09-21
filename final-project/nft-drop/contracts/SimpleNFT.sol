// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721Pausable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";

contract SimpleNFT is ERC721Pausable, AccessControl  {
    bytes32 private constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct Player{
        string name;
        uint8 rarity;
        string tokenURI;
    }
    uint256 public totalSupply;
    uint256 public maxSupply = 30;
    mapping(uint256 => Player) private players;

    event MintPlayer(address indexed user, uint256 indexed playerId);

    constructor() ERC721("SimpleNFT", "SNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
    }

    function setMaxSupply(uint256 _maxSupply) public onlyRole(ADMIN_ROLE)  {
        maxSupply = _maxSupply;
    }
    
    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    function _playerExist(uint256 _playerId) private view returns (bool) {
        return bytes(players[_playerId].name).length > 0;
    }

    function validatePlayer(string memory _name, uint8 _rarity, string memory _tokenURI) private pure {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_rarity > 0 && _rarity <= 3, "Rarity must be between 1 and 3");
        require(bytes(_tokenURI).length > 0, "BaseURI cannot be empty");
    }

    function mintTo(address to, string memory _name, uint8 _rarity, string memory _tokenURI) public whenNotPaused() onlyRole(MINTER_ROLE) {
        validatePlayer(_name, _rarity, _tokenURI);
        require(totalSupply < maxSupply, "Max supply reached");

        totalSupply++;
        uint256 newPlayerId = totalSupply; 
        _safeMint(to, newPlayerId);
        players[newPlayerId] = Player(_name, _rarity, _tokenURI);

        emit MintPlayer(to, newPlayerId);
    }

    function _setURI(uint256 _playerId, string memory _tokenURI) public onlyRole(ADMIN_ROLE) {
        players[_playerId].tokenURI = _tokenURI;
    }

    function getPlayer(uint256 _playerId) external view returns (address user, string memory name, uint8 rarity, string memory tokenURI) {
        require(_playerExist(_playerId), "Player does not exist"); 
        Player storage player = players[_playerId];
        return (
            ownerOf(_playerId),
            player.name,
            player.rarity, 
            player.tokenURI
        );
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
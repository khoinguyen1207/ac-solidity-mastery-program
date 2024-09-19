// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import  {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract SimpleNFT is ERC721, AccessControl  {
    bytes32 private constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct Player{
        string name;
        uint8 age;
        string baseURI;
    }
    uint256 public totalSupply;
    uint256 public maxSupply = 20;
    bool public isMintEnabled;
    mapping(uint256 => Player) private players;

    event MintPlayer(address indexed user, uint256 indexed playerId);

    constructor() ERC721("SimpleNFT", "SNFT") {
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function setMaxSupply(uint256 _maxSupply) public onlyRole(ADMIN_ROLE)  {
        maxSupply = _maxSupply;
    }
    
    function setMintEnabled() public onlyRole(ADMIN_ROLE)  {
        isMintEnabled = !isMintEnabled;
    }

    function _exist(uint256 _playerId) private view returns (bool) {
        return bytes(players[_playerId].name).length > 0;
    }

    function validatePlayer(string memory name, uint8 age, string memory baseURI) private pure {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(age > 0, "Age must be greater than zero");
        require(bytes(baseURI).length > 0, "BaseURI cannot be empty");
    }

    function mintTo(address to, string memory name, uint8 age, string memory baseURI) public onlyRole(MINTER_ROLE) {
        validatePlayer(name, age, baseURI);
        require(isMintEnabled, "Minting is disabled");
        require(totalSupply < maxSupply, "Max supply reached");

        totalSupply += 1;
        uint256 newPlayerId = totalSupply;
        Player memory newPlayer = Player(name, age, baseURI);    
        _safeMint(to, newPlayerId);
        _setPlayer(newPlayerId, newPlayer);
        emit MintPlayer(to, newPlayerId);
    }

    function _setPlayer(uint256 _playerId, Player memory _player) public onlyRole(MINTER_ROLE) {
        players[_playerId] = Player({
            name: _player.name,
            age: _player.age,
            baseURI: _player.baseURI
        });
    }

    function getPlayer(uint256 _playerId) external view returns (Player memory) {
        require(_exist(_playerId), "Player does not exist"); 
        return players[_playerId];
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
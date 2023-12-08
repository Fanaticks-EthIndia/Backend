// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Leaderboard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    bool ready;
    mapping(address => uint256) public poi;
    address public owner;
    Counters.Counter private _tokenIds;
    address contractAddress;
    event ScoreUpdated(address indexed player, uint256 newScore);

    constructor(address marketplaceAddress) {
        ready = false;
        owner = msg.sender;
        contractAddress = marketplaceAddress;
    }

    event ScoreUpdated(address indexed player, uint256 newScore);

    function incrementScore(uint256 _incrementBy,address _sender) external {
        if(poi.containsKey(_sender))
        {
            poi[_sender] = 1;
        }
        else
        {
            poi[_sender] += _incrementBy;
        }

        emit ScoreUpdated(_sender, poi[_sender]);
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function getLeaderboard() external view returns (address[] memory) {
        return leaderboard;
    }
}

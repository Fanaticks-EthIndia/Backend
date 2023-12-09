// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyToken is ERC1155, Ownable, ERC1155Supply {
    struct Event {
        uint256 timestamp;
        address[] attendees ;
    }
    struct Artist { 
        mapping(address => uint256) poi;
        address artist_address;
        address[] poiList;
        uint64 price;
        Event[] events; 
    }

    mapping(string => Artist) catalogue;
    address contractAddress;
    event POIUpdated(address indexed player, uint256 newScore);
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner)
    {

    }

    function incrementScore(uint256 _incrementBy,address _sender,string artist) external {
        if(catalogue['artist'].poiList[_sender])
        {
            catalogue['artist'].poiList.push(_sender);
        }
        poi[_sender] += _incrementBy;

        emit ScoreUpdated(_sender, poi[_sender]);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }


    // To be completed
    function sale(uint256 seats, uint seats_poi,int price,string artist) public
    {   
        if(catalogue['artist'].poiList.length < seats_poi)
        {
            mintBatch(to, ids, amounts, data); 
        }
        
    }
}
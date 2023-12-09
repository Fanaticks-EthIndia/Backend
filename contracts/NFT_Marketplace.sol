// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyToken is ERC1155, Ownable, ERC1155Supply {
    struct Event {
        uint256 timestamp;
        uint256 rem_seats;
        uint price;
        uint64 nextid;
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
        // Siuuuuu
    }

    function incrementScore(uint256 _incrementBy,address _sender,string memory artist) external {
        if(catalogue[artist].poi[_sender] == 0)
        {
            catalogue[artist].poiList.push(_sender);
        }
        catalogue['artist'].poi[_sender] += _incrementBy;

        emit POIUpdated(_sender, catalogue['artist'].poi[_sender]);
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
    function sale(uint256 seats, uint64 seats_poi,uint gprice,string memory artist,bytes memory tokenURIs) public
    {
        
        if(catalogue[artist].poiList.length < seats_poi)
        {           
            for(uint64 i = 0; i < catalogue['artist'].poiList.length;i++)
            {
                mint(catalogue[artist].poiList[i], i+1, 1, tokenURIs);
            }
            Event memory newEvent = Event({
                timestamp: block.timestamp,
                rem_seats: seats, // Using the current block's timestamp as an example
                price: gprice,
                nextid: seats_poi+1
            }); 
            catalogue[artist].events.push(newEvent);
        }
        else
        {
            address[] memory addrs = new address[](seats_poi);
            for(uint64 i = 0; i < seats_poi;i++)
            {
                mint(catalogue[artist].poiList[i], i+1, 1, tokenURIs);
                addrs[i] = catalogue[artist].poiList[i];
            }
            Event memory newEvent = Event({
                timestamp: block.timestamp,
                rem_seats: seats - seats_poi,
                price: gprice,
                nextid: seats_poi+1
            }); 
            catalogue[artist].events.push(newEvent);
        }
    }
    function buy_ticket(string memory artist,bytes memory tokenURIs) external payable {
        uint n = catalogue[artist].events.length;
        uint id = catalogue[artist].events[n-1].nextid;
        catalogue[artist].events[n-1].nextid += 1;
        require(msg.value >= catalogue[artist].events[n-1].price, "Insufficient funds");

        _mint(msg.sender, id, 1, tokenURIs);

        payable(owner()).transfer(msg.value); // Transfer funds to contract owner (or any specific wallet)
    }
}
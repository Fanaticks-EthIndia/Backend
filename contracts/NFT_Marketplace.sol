// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FanaTick is ERC1155, Ownable {
    struct Event {
        uint timestamp;
        uint rem_seats;
        uint price;
        uint nextid;
    }
    struct Artist { 
        mapping(address => uint) poi;
        address artist_address;
        address[] poiList;
        uint64 price;
        Event[] events; 
    }

    mapping(string => Artist) catalogue;
    address contractAddress;
    event POIUpdated(address indexed player, uint newScore);
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner)
    {
        contractAddress = initialOwner;
    }

    function incrementScore(uint _incrementBy,address _sender,string calldata artist) external {
        if(catalogue[artist].poi[_sender] == 0)
        {
            catalogue[artist].poiList.push(_sender);
        }
        catalogue['artist'].poi[_sender] += _incrementBy;

        emit POIUpdated(_sender, catalogue['artist'].poi[_sender]);
    }

    function mint(address account, uint id, uint amount, bytes calldata data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }


    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint[] memory ids, uint[] memory values)
        internal
        override(ERC1155)
    {
        super._update(from, to, ids, values);
    }


    function sale(uint seats, uint64 seats_poi,uint gprice,string memory artist,bytes calldata tokenURIs) public
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
    function buy_ticket(string calldata artist,bytes calldata tokenURIs) external payable {
        uint n = catalogue[artist].events.length;
        uint id = catalogue[artist].events[n-1].nextid;
        catalogue[artist].events[n-1].nextid += 1;
        require(msg.value >= catalogue[artist].events[n-1].price, "Insufficient funds");

        _mint(msg.sender, id, 1, tokenURIs);

        payable(owner()).transfer(msg.value); // Transfer funds to contract owner (or any specific wallet)
    }
}
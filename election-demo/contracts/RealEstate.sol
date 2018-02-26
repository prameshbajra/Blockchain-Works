pragma solidity ^0.4.2;

contract RealEstate {
    
    struct House {
        uint id;
        bytes32 name;
        bytes32 location;
        uint256 price;
        address seller;
        address buyer;
    }
    
    uint public houseCount;
    mapping(uint => House) public houses;
    
    function RealEstate () public {      
    }
    
    function addHouse (bytes32 _name, bytes32 _location, uint256 _price) public {
        houseCount++;
        houses[houseCount] = House(houseCount, _name, _location, _price, msg.sender, 0x0);
    }

    function buy(uint _id) payable public {
        require(houses[_id].seller != 0x0);
        require(houses[_id].buyer == 0x0);
        require(msg.sender != houses[_id].seller);
        require(msg.value == houses[_id].price);
        houses[_id].buyer = msg.sender;
        houses[_id].seller.transfer(msg.value);
    }
    
}

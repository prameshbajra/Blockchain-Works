pragma solidity ^0.4.18;

contract Owned {
    address owner;

    function Owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

contract Main is Owned {
    struct Information {
        // Using bytes16 instead of string because string is costly in ethereum network ...
        bytes16 firstName;
        bytes16 lastName;
        uint age;
    }
    
    mapping (address => Information) informations;
    address[] public informationAccounts;

    event InformationInfoEvent (
        bytes16 firstName,
        bytes16 lastName,
        uint age
    );

    function setInformation(address _address, uint _age, bytes16 _firstName, bytes16 _lastName) onlyOwner public {
        var information = informations[_address];
        
        information.age = _age;
        information.firstName = _firstName;
        information.lastName = _lastName;

        informationAccounts.push(_address) - 1;
        InformationInfoEvent(_firstName, _lastName, _age);
    }

    function getInformation(address _address) view public returns (uint, bytes16, bytes16) {
        return (informations[_address].age, informations[_address].firstName, informations[_address].lastName);
    } 

    function getInformations() view public returns(address[]) {
        return informationAccounts;
    }

    function countInformations() view public returns (uint) {
        return informationAccounts.length;
    }
}
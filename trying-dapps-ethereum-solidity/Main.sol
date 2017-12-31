pragma solidity ^0.4.18;

contract Main {
    struct Information {
        string firstName;
        string lastName;
        uint age;
    }
    
    mapping (address => Information) informations;
    address[] public informationAccounts;

    function setInformation(address _address, uint _age, string _firstName, string _lastName) public {
        var information = informations[_address];
        
        information.age = _age;
        information.firstName = _firstName;
        information.lastName = _lastName;

        informationAccounts.push(_address) - 1;
    }

    function getInformation(address _address) view public returns (uint, string, string) {
        return (informations[_address].age, informations[_address].firstName, informations[_address].lastName);
    } 

    function getInformations() view public returns(address[]){
        return informationAccounts;
    }

    function countInstructors() view public returns (uint) {
        return informationAccounts.length;
    }
}
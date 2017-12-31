pragma solidity ^0.4.18;

contract Demo {
    string public name;
    uint age; 
    address owner;
    function Demo() public {
        owner = msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;      // This means if sender == owner then only rest of the function body will run ...
    }
    event Info(string name, uint age);
    function setInfo(string _name, uint _age) onlyOwner public {
        name = _name;
        age = _age;
        Info(_name, _age);
    }
    function getInfo() view public returns(string, uint) {
        return (name, age);
    }
}
pragma solidity ^0.4.18;

contract Demo {
    string public name;
    uint age; 
    event Info(string name, uint age);
    function setInfo(string _name, uint _age) public {
        name = _name;
        age = _age;
        Info(_name, _age);
    }
    function getInfo() public constant returns(string, uint) {
        return (name, age);
    }
}
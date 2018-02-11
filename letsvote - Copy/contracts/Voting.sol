pragma solidity ^0.4.18;

contract Voting {
    uint num;
    uint anotherNum = 1000;
    function setValue (uint number) public {
        num = number;
    }
    function getValue () public view returns (uint) {
        return num;
    }
    function getAnotherValue () view public returns (uint) {
        return anotherNum;
    }
}
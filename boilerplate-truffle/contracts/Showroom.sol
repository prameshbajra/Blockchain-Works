pragma solidity ^0.4.17;

contract Showroom {
    string name = "Pramesh Bajracharya";
    string location = "Chabahil, Kathmandu";
    function getName() view public returns (string) {
        return name;
    }
    function getLocation() view public returns (string) {
        return location;
    }
}
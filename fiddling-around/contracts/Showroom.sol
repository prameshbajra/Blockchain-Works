pragma solidity ^0.4.17;

contract Showroom {
    string name = "Pramesh Bajracharya";
    string locationValue;
    function getName() view public returns (string) {
        return name;
    }
    function setLocation(string location) public {
        locationValue = location;
    }
    function getLocation() view public returns(string) {
        return locationValue;
    }
}
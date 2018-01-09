pragma solidity ^0.4.17;

contract Demo {
    DemoTwo demoTwo = new DemoTwo();
    
    function getNameHere() view public returns (bytes32) {
        return demoTwo.getName();
    }
    
    function setNameHere(bytes32 newName) public {
        demoTwo.setName(newName);
    }
}

contract DemoTwo {
    bytes32 name;
    function setName(bytes32 newName) public {
        name = newName;
    }
    function getName() view public returns (bytes32) {
        return name;
    }
}
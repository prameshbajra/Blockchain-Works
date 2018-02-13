pragma solidity ^0.4.18;

contract Voting {
    bytes32 num;

    event SettedValue (
        bytes32 num
    );

    function setValue(bytes32 number) public {
        num = number;
        SettedValue(num);
    }

    function getValue() public view returns(bytes32, uint) {
        return (num, 100);
    }
}
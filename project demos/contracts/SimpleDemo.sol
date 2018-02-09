pragma solidity ^0.4.14;

contract SimpleDemo {
    function sender(address receiver, uint amount) public payable returns (bool) {
        require(msg.sender.balance > amount);
        receiver.transfer(amount);
        return true;
    }

    function getBalance(address addr) public view returns (uint) {
        return addr.balance;
    }
}

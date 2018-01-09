pragma solidity ^0.4.17;

contract Account {
    address myAddress;
    bool flag = false;
    
    function Account() public {
        myAddress = msg.sender;
    }
    
    modifier isOwner() {
        if (myAddress == msg.sender) {
            _;
        }
    }
    
    function seeAccount() isOwner view public returns (uint) {
        return this.balance;
    }
    
    // This function needs a value to be send (in wei) and account is credited affai
    // This is done by payable ....
    function depositMoney() payable public {}
    
    function withdrawMoney(uint amount) isOwner public {
        // .send return a boolean value ...
        if (myAddress.send(amount)) {
            flag = true;
        }else {
            flag = false;
        }
    }   
}
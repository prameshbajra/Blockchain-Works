pragma solidity ^0.4.18;

contract VotingContract {
    address owner;
    bytes32 public nameOfVoting;
    bytes32 public startDate;
    bytes32 public endDate;
    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function VotingContract () public {
        owner = msg.sender;
    }
    
    function setVotingName (bytes32 _nameOfVoting) isOwner public {
        nameOfVoting = _nameOfVoting;
    }   

    // Timer functions ...
    function setStartDate (bytes32 _startDate) isOwner public {
        startDate = _startDate;
    }  
 
    function setEndDate (bytes32 _endDate) isOwner public {
        endDate = _endDate;
    }
   
}
pragma solidity ^0.4.18;

contract VotersContract {
    uint voterId;
    
    struct VoterDetails {
        bytes32 name;
        bytes32 dateOfBirth;
        bool voted;
    }
    
    mapping (uint => VoterDetails) voters;
    
    function setVoterId (uint _voterId) public {
        voterId = _voterId;
    }  
    
    function setVoterDetails (bytes32 _name, bytes32 _dateOfBirth, bool _voted) public {
        var voterObject = voters[voterId];
        voterObject.name = _name;
        voterObject.dateOfBirth = _dateOfBirth;
        voterObject.voted = _voted;
    }
    
    function getVoterDetails (uint voterIdToGet) public view returns (bytes32, bytes32, bool) {
       var voterObject = voters[voterIdToGet];
       return (voterObject.name, voterObject.dateOfBirth, voterObject.voted); 
    }
}
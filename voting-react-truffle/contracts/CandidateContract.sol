pragma solidity ^0.4.18;

contract CandidateContract {
    
    struct Candidate {
        bytes32 firstName;
        bytes32 lastName;
        bytes32 location;
        uint age;
    }
    
    address owner;
    mapping (address => Candidate) public candidates;
    
    modifier isOwner {
        require(msg.sender == owner);
        _;
    }
    
    function CandidateContract () public {
        owner = msg.sender;
    }
    
    
    function enterAsCandidate (
        bytes32 _firstName,
        bytes32 _lastName,
        bytes32 _location,
        uint _age
    ) isOwner public 
    {
        var candidatesObject = candidates[msg.sender];
        candidatesObject.firstName = _firstName;
        candidatesObject.lastName = _lastName;
        candidatesObject.location = _location;
        candidatesObject.age = _age;
    }
    
    function getCandidateDetails(address _addressForCandidate) 
        public view returns (
            bytes32 _firstName,
            bytes32 _lastName,
            bytes32 _location,
            uint _age
        ) {
            var addr = candidates[_addressForCandidate];
            return (
                addr.firstName,
                addr.lastName,
                addr.location,
                addr.age
            );
        }
}
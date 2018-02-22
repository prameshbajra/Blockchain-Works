pragma solidity ^0.4.2;

contract Election {
    
    struct Candidate {
        uint id;
        bytes32 name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;
    address public owner;

    event votedEvent (
        uint indexed _candidateId
    );
    
    function Election () public {
        owner = msg.sender;
    }
    
    modifier isOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate (bytes32 _name) isOwner public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        require(!voters[msg.sender]);
        require(msg.sender != owner);
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount ++;
        votedEvent(_candidateId);
    }
}
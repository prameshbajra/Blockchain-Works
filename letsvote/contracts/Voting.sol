pragma solidity ^0.4.18;

contract Voting {
    address mainAddress;
    bytes32[] candidateNames;
    mapping(bytes32 => uint) candidateVotes;

    function Voting() public {
        mainAddress = msg.sender;
    }
    modifier isMainAddress {
        if (msg.sender == mainAddress) {
            _;
        }
    }
    
    function getAllCandidates() public view returns (bytes32[]) {
        return candidateNames;
    }
    
    function setCandidate(bytes32 newCandidate) isMainAddress payable public {
        candidateNames.push(newCandidate);
    }
    
    function setVote(bytes32 candidate) public {
        candidateVotes[candidate] = candidateVotes[candidate] + 1;
    }

    function getVote(bytes32 candidate) public view returns (uint) {
        return candidateVotes[candidate];
    }
}
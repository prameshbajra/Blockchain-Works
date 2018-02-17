const VotingContract = artifacts.require("./VotingContract.sol");
const CandidateContract = artifacts.require("./CandidateContract.sol");
const VotersContract = artifacts.require("./VotersContract.sol");

module.exports = function (deployer) {
    deployer.deploy(VotersContract);
    deployer.deploy(VotingContract);
    deployer.deploy(CandidateContract);
};

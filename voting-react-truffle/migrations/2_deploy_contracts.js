const Voting = artifacts.require("./Voting.sol");
const CandidateContract = artifacts.require("./CandidateContract.sol");

module.exports = function (deployer) {
    deployer.deploy(Voting);
    deployer.deploy(CandidateContract);
};

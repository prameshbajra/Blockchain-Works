const fs = require("fs");
const solc = require("solc");
const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const code = fs.readFileSync('Voting.sol').toString();
const compiledCode = solc.compile(code);

// number of methods available ...
const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
// deploy and initiate contracts in the blockchain ...
const VotingContract = web3.eth.contract(abiDefinition);
const byteCode = compiledCode.contracts[':Voting'].bytecode;
// deploys the contract to the blockchain ...
const deployedContract = VotingContract.new(['Pramesh', 'Suzal', 'Bajracharya'], {
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
});
const contractInstance = VotingContract.at(deployedContract.address);

console.log(contractInstance)
import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';
import CandidateContract from '../../build/contracts/CandidateContract.json'

class Candidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            error: undefined
        }
    }
    componentWillMount() {
        getWeb3.then(results => {
            this.setState(() => ({
                web3: results.web3
            }))
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }
    formHandler = (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const location = e.target.location.value;
        const age = e.target.age.value;
        let candidateContractInstance;
        const contract = require('truffle-contract')
        const candidateContract = contract(CandidateContract)
        candidateContract.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            candidateContract.deployed().then((instance) => {
                candidateContractInstance = instance;
                return candidateContractInstance.enterAsCandidate(
                    firstName,
                    lastName,
                    location,
                    age,
                    { from: accounts[0], gas: 303030 }
                );
            }).then((result) => {
                console.log("result", result)
                return candidateContractInstance.getAllAddresses();
            }).then((finalResult) => {
                this.setState(() => ({ error: undefined }))
                console.log("finalResult", finalResult);
            }).catch((error) => {
                this.setState(() => ({
                    error: "Sorry, you cannot enter as a candidate. You do not have permission to do so. "
                }))
            })
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.formHandler}>
                    FirstName:
                    <input type="text" name="firstName" />
                    LastName:
                    <input type="text" name="lastName" />
                    Location:
                    <input type="text" name="location" />
                    Age:
                    <input type="text" name="age" />
                    <button type="submit">Submit</button>
                </form>
                {this.state.error}
            </div>
        );
    }
}

export default Candidate;

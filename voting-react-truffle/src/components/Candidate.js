import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';
import CandidateContract from '../../build/contracts/CandidateContract.json'

class Candidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            visibleDetails: true,
            id: null,
            name: undefined,
            dateOfBirth: undefined,
            standFor: undefined
        }
    }
    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3,
            })
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }
    setCandidateIdHandler = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        let candidateContractInstance;
        const contract = require('truffle-contract');
        const candidateContract = contract(CandidateContract);
        candidateContract.setProvider(this.state.web3.currentProvider);
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            candidateContract.deployed().then((instance) => {
                candidateContractInstance = instance;
                // eslint-disable-next-line
                this.state.web3.eth.defaultAccount = accounts[0];
                return candidateContractInstance.candidateIdSetter(id, { from: accounts[0] });
            }).then((result) => {
                console.log("result", result);
                this.setState(() => ({ id: id, visibleDetails: false }))
            }).catch((error) => {
                console.error(error);
            });
        });
    }
    setCandidateDetailsHandler = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const dateOfBirth = e.target.dateOfBirth.value;
        const standFor = e.target.standFor.value;
        let candidateContractInstance;
        const contract = require('truffle-contract');
        const candidateContract = contract(CandidateContract);
        candidateContract.setProvider(this.state.web3.currentProvider);
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            candidateContract.deployed().then((instance) => {
                candidateContractInstance = instance;
                return candidateContractInstance.setCandidateDetails(name, dateOfBirth, standFor, 0, { from: accounts[0] });
            }).then((result) => {
                console.log("result1", result);
                console.log("id", this.state.id);
                console.log(candidateContractInstance);
                return candidateContractInstance.candidates(this.state.id);
            }).then((candidateDetails) => {
                console.log("candidateDetails", candidateDetails);
                const name = candidateDetails[0];
                const dateOfBirth = candidateDetails[1];
                const standFor = candidateDetails[2];
                this.setState(() => ({ name, dateOfBirth, standFor, visibleDetails: true }))
            }).catch((error) => {
                console.error("error", error);
            })
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.setCandidateIdHandler}>
                    <input type="text" name="id" />
                    <button type="submit">Submit</button>
                </form>
                {
                    this.state.visibleDetails ?
                        (<h3>Please enter the ID for the candidate</h3>) :
                        (
                            <form onSubmit={this.setCandidateDetailsHandler}>
                                <input type="text" name="name" />
                                <input type="text" name="dateOfBirth" />
                                <input type="text" name="standFor" />
                                <button type="submit">Submit</button>
                            </form>
                        )
                }
                {
                    this.state.name ?
                        <h3>
                            {this.state.web3.toAscii(this.state.name).replace(/\u0000/g, '')} born on
                            {this.state.web3.toAscii(this.state.dateOfBirth).replace(/\u0000/g, '')}
                            and standing for {this.state.web3.toAscii(this.state.standFor)}
                            with id {this.state.id} has been registered successfully.
                        </h3> : null
                }
            </div>
        );
    }
}

export default Candidate;

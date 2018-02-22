import React, { Component } from 'react';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../../utils/getWeb3';

import CandidateList from './CandidateList';

class Owner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            candidateName: null,
            candidatesCount: null,
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            })
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    addCandidate = (e) => {
        e.preventDefault();
        const candidateName = e.target.candidateName.value;
        let electionContractInstance;
        const contract = require('truffle-contract');
        const electionContract = contract(Election);
        electionContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            electionContract.deployed().then((instance) => {
                electionContractInstance = instance;
                return electionContractInstance.addCandidate(candidateName, { from: accounts[0] });
            }).then((result) => {
                return electionContractInstance.candidatesCount.call();
            }).then((result2) => {
                console.log(result2);
                this.setState(() => ({ candidatesCount: result2.c[0], candidateName }));
            }).catch((error) => {
                console.log("You are not allowed to do this, Sorry !")
            });
        })
    }

    render() {
        return (
            <div>
                Add Candidate ...
                <form onSubmit={this.addCandidate}>
                    <input type="text" name="candidateName" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                {
                    this.state.candidateName ?
                        (<p>{this.state.candidateName} has been successfully registered. <br />
                            Total registered candidate : {this.state.candidatesCount}</p>) : null
                }
                <br />
                <CandidateList />
                <h3>This is place for the timer.</h3>
            </div>
        );
    }
}

export default Owner;

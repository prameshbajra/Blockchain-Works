import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';
import VotingContract from '../../build/contracts/Voting.json'

class Candidate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            allCandidates: [],
            vote: 0
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

    voteHandler = (e) => {
        const candidateName = this.state.web3.toAscii(this.props.candidateName).replace(/\u0000/g, '');
        let votingContractInstance;
        const contract = require('truffle-contract')
        const votingContract = contract(VotingContract)
        votingContract.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votingContract.deployed().then((instance) => {
                votingContractInstance = instance;
                return votingContractInstance.setVote(candidateName, { from: accounts[0] });
            }).then((result) => {
                console.log(result);
            });
        });
    }

    getVote = () => {
        const candidateName = this.state.web3.toAscii(this.props.candidateName).replace(/\u0000/g, '');
        let votingContractInstance;
        const contract = require('truffle-contract')
        const votingContract = contract(VotingContract)
        votingContract.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votingContract.deployed().then((instance) => {
                votingContractInstance = instance;
                return votingContractInstance.getVote(candidateName);
            }).then((result) => {
                this.setState(() => ({
                    vote: result.c[0]
                }));
            });
        });
    }

    render() {
        return (
            <div className="thumbnail">
                <div className="caption">
                    <h4>
                        {this.state.web3 ?
                            this.state.web3.toAscii(this.props.candidateName).replace(/\u0000/g, '') :
                            "Loading ..."}
                    </h4>
                    <p>
                        <button onClick={this.voteHandler} className="btn btn-info" role="button">Vote</button>
                        <button onClick={this.getVote} className="btn btn-default pull-right">Total : {this.state.vote}</button>
                    </p>
                </div>
            </div>
        );
    }
}

export default Candidate;
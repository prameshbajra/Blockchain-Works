import React, { Component } from 'react'

import VotingContract from '../../build/contracts/Voting.json'
import getWeb3 from '../utils/getWeb3'

class AddCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null
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

    onSubmit = (e) => {
        e.preventDefault();
        const newCandidateName = e.target.candidateName.value;
        let votingContractInstance;
        const contract = require('truffle-contract');
        const votingContract = contract(VotingContract);
        votingContract.setProvider(this.state.web3.currentProvider);
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votingContract.deployed().then((instance) => {
                votingContractInstance = instance
                return votingContractInstance.setCandidate(newCandidateName, { from: accounts[0] });
            }).then((result) => {
                this.props.history.push('/');
            })
        })
    }
    render() {
        return (
            <div className="container" >
                <form onSubmit={this.onSubmit} className="form">
                    <input name="candidateName" type="text" className="form-control" />
                    <button type="submit" className="btn btn-default">
                        Add
                    </button>
                </form>
            </div>
        );
    }
}

export default AddCandidate;
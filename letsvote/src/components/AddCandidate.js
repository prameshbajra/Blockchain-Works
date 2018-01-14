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
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="jumbotron">
                            <h1 className="text-center">Candidate Entrance</h1>
                            <br /><br />
                            <form onSubmit={this.onSubmit} className="form">
                                <label>Enter the name of the candidate you want to enter.</label>
                                <input name="candidateName" type="text" className="form-control" />
                                <br />
                                <button type="submit" className="btn btn-info btn-block">
                                    Add Candidate
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCandidate;
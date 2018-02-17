import React, { Component } from 'react';

import VotersContract from '../../build/contracts/VotersContract.json'
import getWeb3 from '../utils/getWeb3'

class Voters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            visibleDetails: true,
            id: null
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
    setVotersIdFormHandler = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        let votersContractInstance;
        const contract = require('truffle-contract');
        const votersContract = contract(VotersContract);
        votersContract.setProvider(this.state.web3.currentProvider);
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votersContract.deployed().then((instance) => {
                votersContractInstance = instance
                return votersContractInstance.setVoterId(id, { from: accounts[0] });
            }).then((result) => {
                console.log("result", result);
                this.setState(() => ({ id: id, visibleDetails: false }));
            }).catch((error) => {
                console.error("error", error)
            })
        })
    }
    setVotersDetailsFormHandler = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const dateOfBirth = e.target.dateOfBirth.value;
        console.log(name, dateOfBirth);
        let votersContractInstance;
        const contract = require('truffle-contract');
        const votersContract = contract(VotersContract);
        votersContract.setProvider(this.state.web3.currentProvider);
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votersContract.deployed().then((instance) => {
                votersContractInstance = instance
                return votersContractInstance.setVoterDetails(name, dateOfBirth, false, { from: accounts[0] });
            }).then((result) => {
                console.log("result", result);
                return votersContractInstance.voters.call(this.state.id);
            }).then((votersDesc) => {
                console.log("Voters Desc", votersDesc);
            }).catch((error) => {
                console.error("error", error)
            })
        })
    }
    render() {
        return (
            <div>
                Voters Registration
                <br />
                You Have to enter your ID for verification.
                <form onSubmit={this.setVotersIdFormHandler}>
                    <input type="text" name="id" />
                    <button type="submit">Submit</button>
                </form>
                {
                    this.state.visibleDetails ?
                        (<h1>Please enter your ID to Continue</h1>) :
                        (
                            <form onSubmit={this.setVotersDetailsFormHandler}>
                                <input type="text" name="name" />
                                <input type="text" name="dateOfBirth" />
                                <button type="submit">Submit</button>
                            </form>
                        )
                }
            </div>
        );
    }
}

export default Voters;

import React, { Component } from 'react';

import VotersContract from '../../build/contracts/VotersContract.json'
import getWeb3 from '../utils/getWeb3'

class Voters extends Component {
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
    formHandler = (e) => {
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
                <form onSubmit={this.formHandler}>
                    <input type="text" name="id" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Voters;

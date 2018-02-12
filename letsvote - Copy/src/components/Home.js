import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';
import VotingContract from '../../build/contracts/Voting.json'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            data: undefined
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

    getData = (e) => {
        e.preventDefault();
        let inputValue = e.target.inputValue.value;
        let votingContractInstance;
        const contract = require('truffle-contract')
        const votingContract = contract(VotingContract)
        votingContract.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votingContract.deployed().then((instance) => {
                votingContractInstance = instance;
                return votingContractInstance.setValue(inputValue, { from: accounts[0], gas: 303030 });
            }).then((result) => {
                console.log("result", result);
                return votingContractInstance.getValue();
            }).then((finalResult) => {
                console.log("finalResult", finalResult);
                this.setState(() => {
                    return {
                        data: this.state.web3.toAscii(finalResult).replace(/\u0000/g, '')
                    }
                })
            }).catch((error) => {
                console.error(error);
            })
        });
    }

    render() {
        return (
            <div className="thumbnail">
                <form onSubmit={this.getData}>
                    <input type="text" name="inputValue" />
                    <button type="submit">Submit button</button>
                </form>
                <h1>{this.state.data}</h1>
            </div>
        );
    }
}

export default Home;
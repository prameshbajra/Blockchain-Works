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

    getData = () => {
        let votingContractInstance;
        const contract = require('truffle-contract')
        const votingContract = contract(VotingContract)
        votingContract.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votingContract.deployed().then((instance) => {
                votingContractInstance = instance;
                return votingContractInstance.setValue(100, { from: accounts[0], gas: 333333 });
            }).then((result) => {
                console.log(result);
                return votingContractInstance.getValue();
            }).then((finalResult) => {
                this.setState(() => {
                    return {
                        data: finalResult.c[0]
                    }
                })
            }).catch((error) => {
                console.log(error);
            })
        });
    }

    render() {
        return (
            <div className="thumbnail">
                <div className="caption">
                    <button onClick={() => { this.getData() }}>Getting</button>
                </div>
                <h1>{this.state.data}</h1>
            </div>
        );
    }
}

export default Home;
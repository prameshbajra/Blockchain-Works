import React, { Component } from 'react';

import Election from '../../build/contracts/Election.json';
import getWeb3 from '../utils/getWeb3';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            candidatesCount: undefined,
            isButtonVisible: false
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
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            electionContract.deployed().then((instance) => {
                electionContractInstance = instance
                // Stores a given value, 9 by default.
                return electionContractInstance.addCandidate(candidateName, { from: accounts[0] })
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                console.log("result", result);
                return electionContractInstance.candidatesCount.call(accounts[0])
            }).then((result2) => {
                // Update state with the result.
                console.log("result2", result2);
                this.setState({ candidatesCount: result2.c[0], isButtonVisible: true });
            }).catch((error) => {
                console.log("You are not allowed to do this, Sorry !")
            });
        })
    }

    render() {
        return (
            <div className="container">
                Add Candidate:
                <form onSubmit={this.addCandidate}>
                    <input type="text" name="candidateName" />
                    <button type="submit">Submit</button>
                </form>
                {
                    this.state.candidatesCount ?
                        (<h3>{this.state.candidatesCount} are registered.</h3>) :
                        null
                }
            </div>
        );
    }
}

export default App;

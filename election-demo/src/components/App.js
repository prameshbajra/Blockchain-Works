import React, { Component } from 'react';

import Election from '../../build/contracts/Election.json';
import getWeb3 from '../utils/getWeb3';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            candidatesCount: undefined,
            isButtonVisible: false,
            candidateArray: [],
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
                electionContractInstance = instance
                return electionContractInstance.addCandidate(candidateName, { from: accounts[0] })
            }).then((result) => {
                return electionContractInstance.candidatesCount.call(accounts[0])
            }).then((result2) => {
                this.setState({ candidatesCount: result2.c[0], isButtonVisible: true });
            }).catch((error) => {
                console.log("You are not allowed to do this, Sorry !")
            });
        })
    }

    getAllCandidates = () => {
        let electionContractInstance;
        const contract = require('truffle-contract');
        const electionContract = contract(Election);
        electionContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            electionContract.deployed().then((instance) => {
                electionContractInstance = instance;
                console.log(this.state.candidatesCount);
                for (let i = 1; i <= this.state.candidatesCount; i++) {
                    electionContractInstance.candidates.call(i)
                        .then((result) => {
                            this.setState(() => ({
                                candidateArray: [...this.state.candidateArray,
                                result[1]]
                            }));
                        })
                }
            })
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
                        <h3>{this.state.candidatesCount} are registered.
                        <button onClick={this.getAllCandidates} > Get All Candidates</button></h3> :
                        null
                }
                {
                    this.state.candidateArray.map((candidate) => {
                        return (
                            <li key={Math.random()}>
                                {this.state.web3.toAscii(candidate).replace(/\u0000/g, '')}
                            </li>
                        );
                    })
                }
            </div >
        );
    }
}

export default App;

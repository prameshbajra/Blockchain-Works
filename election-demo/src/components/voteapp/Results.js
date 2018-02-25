import React, { Component } from 'react';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../../utils/getWeb3';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            candidateNameArray: [],
            candidateVotesArray: [],
            winVotes: null,
            winCandidate: null,
            buttonVisible: true
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

    viewAllCandidates = () => {
        let electionContractInstance;
        const contract = require('truffle-contract');
        const electionContract = contract(Election);
        electionContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            electionContract.deployed().then((instance) => {
                electionContractInstance = instance;
                return electionContractInstance.candidatesCount.call();
            }).then((count) => {
                // Candidate id is their index number hence for loop is
                // used to fetch canidate data and store in array.
                // Try to optimize this more ... But for now it works...
                for (let i = 1; i <= count; i++) {
                    electionContractInstance.candidates.call(i)
                        .then((result) => {
                            // Destructuring previous array and adding to last.
                            this.setState(() => ({
                                candidateNameArray: [...this.state.candidateNameArray, result[1]],
                                candidateVotesArray: [...this.state.candidateVotesArray, result[2].c[0]],
                                buttonVisible: false
                            }));
                        });
                }
            })
        })
    }

    winner = () => {
        const winVotes = this.state.candidateVotesArray.reduce((a, b) => Math.max(a, b));
        const winCandidate = this.state.candidateNameArray[this.state.candidateVotesArray.indexOf(winVotes)];
        this.setState(() => ({
            winVotes: winVotes,
            winCandidate: this.state.web3.toAscii(winCandidate).replace(/\u0000/g, '')
        }));
    }

    render() {
        return (
            <div>
                {
                    this.state.buttonVisible ?
                        <button onClick={this.viewAllCandidates}>View ...Results</button> :
                        <div>
                            {
                                this.state.candidateNameArray.map((name, i) => {
                                    return (
                                        <h3 key={i}>
                                            {this.state.web3.toAscii(name).replace(/\u0000/g, '')} ------>
                                            {this.state.candidateVotesArray[i]}
                                        </h3>
                                    )
                                })
                            }
                            <button onClick={this.winner}>
                                See winner
                            </button>
                        </div>
                }
                {
                    this.state.winCandidate ?
                        <div>Congratulations! {this.state.winCandidate} won the election by {this.state.winVotes} votes.</div> :
                        null
                }
            </div>
        );
    }
}

export default Results;

import React, { Component } from 'react';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../../utils/getWeb3';

class CandidateList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            candidatesCount: null,
            candidateArray: []
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            })
            this.renderList();
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    renderList = () => {
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
                // Try to optimize this more ... But for now it works.
                for (let i = 1; i <= count; i++) {
                    electionContractInstance.candidates.call(i)
                        .then((result) => {
                            // Destructuring previous array and adding to last.
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
            <div>
                CandidateList
                <div>
                    {
                        this.state.candidateArray.map((candidate) => {
                            return (
                                <li key={Math.random()}>
                                    {this.state.web3.toAscii(candidate).replace(/\u0000/g, '')}
                                </li>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CandidateList;

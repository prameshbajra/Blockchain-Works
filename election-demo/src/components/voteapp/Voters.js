import React, { Component } from 'react';

import Timer from './Timer';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../../utils/getWeb3';

import moment from 'moment';

class Voters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            candidateArray: [],
            message: undefined,
            startDate: null,
            endDate: null
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
                return electionContractInstance.startDate.call();
            }).then((result) => {
                this.setState(() => ({ startDate: result }));
                return electionContractInstance.endDate.call();
            }).then((result) => {
                this.setState(() => ({ endDate: result }));
                return electionContractInstance.candidatesCount.call();
            }).then((count) => {
                // Candidate id is their index number hence for loop is
                // used to fetch canidate data and store in array.
                // Try to optimize this more ... But for now it works.
                const startDate = this.state.web3.toAscii(this.state.startDate).replace(/\u0000/g, '');
                const endDate = this.state.web3.toAscii(this.state.endDate).replace(/\u0000/g, '');
                console.log(moment(startDate).unix(), moment(endDate).unix());
                if (moment('2018-09-09').unix() >= moment(startDate).unix() && moment('2018-09-09').unix() <= moment(endDate).unix()) {
                    for (let i = 1; i <= count; i++) {
                        electionContractInstance.candidates.call(i)
                            .then((result) => {
                                // Destructuring previous array and adding to last.
                                this.setState(() => ({
                                    candidateArray: [...this.state.candidateArray, result[1]],
                                }));
                            });
                    }
                } else {
                    this.setState(() => ({ message: "The elections are already over." }))
                }
            })
        })
    }

    voteCandidate = (e, id) => {
        let electionContractInstance;
        const contract = require('truffle-contract');
        const electionContract = contract(Election);
        electionContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            electionContract.deployed().then((instance) => {
                electionContractInstance = instance;
                return electionContractInstance.vote(id, { from: accounts[0] });
            }).then((result) => {
                this.setState(() => ({ message: "Thank you for your vote." }));
                return electionContractInstance.candidatesCount.call();
            }).then((count) => {
                for (let i = 1; i <= count; i++) {
                    electionContractInstance.candidates.call(i)
                        .then((result) => {
                            console.log(result);
                        })
                }
            }).catch((error) => {
                console.log("error", error);
                this.setState(() => ({ message: "You can only vote once." }))
            })
        })
    }

    render() {
        return (
            <div>
                CandidateList
                <div>
                    {
                        this.state.candidateArray.map((candidate, i) => {
                            return (
                                <li key={i + 1}>
                                    {this.state.web3.toAscii(candidate).replace(/\u0000/g, '')}
                                    {
                                        (<button onClick={(e) => this.voteCandidate(e, i + 1)}>
                                            Vote
                                        </button>)
                                    }
                                </li>
                            );
                        })
                    }
                    {this.state.message}
                </div>
                <Timer />
            </div>
        );
    }
}

export default Voters;

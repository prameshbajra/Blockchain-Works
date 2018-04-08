import React, { Component } from 'react';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../../utils/getWeb3';

import Results from './Results';

import moment from 'moment';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            startDate: null,
            endDate: null,
        };
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });
            let electionContractInstance;
            const contract = require('truffle-contract');
            const electionContract = contract(Election);
            electionContract.setProvider(this.state.web3.currentProvider);
            this.state.web3.eth.getAccounts((error, accounts) => {
                electionContract.deployed().then((instance) => {
                    electionContractInstance = instance;
                    return electionContractInstance.startDate.call();
                }).then((result) => {
                    this.setState(() => ({ startDate: this.state.web3.toAscii(result).replace(/\u0000/g, '') }));
                    return electionContractInstance.endDate.call();
                }).then((result) => {
                    this.setState(() => ({ endDate: this.state.web3.toAscii(result).replace(/\u0000/g, '') }));
                });
            });
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    renderMessage = () => {
        if (moment(this.state.startDate).unix()) {
            if (moment('2019-09-09').unix() <= moment(this.state.startDate).unix()) {
                return (<h1>The elections has not yet started.</h1>);
            } else if (moment('2019-09-09').unix() >= moment(this.state.endDate).unix()) {
                return (<div><h1 className="text-center">The election has already ended</h1>
                    <Results /></div>);
            }
            return (<h1 className="msg">Keep Voting</h1>);
        } else {
            return (<div><h1>The election has not yet started.</h1></div>);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.startDate ?
                        (<center><p>The election is from<br /> {this.state.startDate} to {this.state.endDate}.</p></center>) : null
                }
                {this.renderMessage()}
            </div >
        );
    }
}

export default Timer;

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
        if (moment('2018-09-09').unix() >= moment(this.startDate).unix() && moment('2018-09-09').unix() <= moment(this.endDate).unix()) {
            return (<h1>Keep Voting</h1>);
        }
        return (<div><h1>The election has already ended</h1> <Results /></div>);
    }

    render() {
        return (
            <div>
                The election started in {this.state.startDate} and will end in {this.state.endDate}.
                {this.renderMessage()}
            </div >
        );
    }
}

export default Timer;

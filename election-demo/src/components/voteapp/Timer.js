import React, { Component } from 'react';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../../utils/getWeb3';

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
        if (moment().unix() >= moment(this.startDate).unix() && moment().unix() <= moment(this.endDate).unix()) {
            return (<h1>Keep Voting</h1>);
        }
        return (<h1>The election has already ended</h1>);
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

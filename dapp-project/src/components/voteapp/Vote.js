import React, { Component } from 'react';

import Voters from './Voters';
import Owner from './Owner';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../..//utils/getWeb3';

class Vote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            isOwner: false,
        };
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            })
            this.renderCorrectPage();
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    renderCorrectPage = () => {
        let electionContractInstance;
        const contract = require('truffle-contract');
        const electionContract = contract(Election);
        electionContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            electionContract.deployed().then((instance) => {
                electionContractInstance = instance
                return electionContractInstance.owner.call();
            }).then((result) => {
                if (result === this.state.web3.eth.accounts[0]) {
                    this.setState(() => ({ isOwner: true }));
                }
                else
                    this.setState(() => ({ isOwner: false }));
            });
        })
    }

    render() {
        return (
            <div>
                <div className="navbar">
                    <ul className="items">
                        <li className="item">
                            <a className="item" href="./home.html">Home</a>
                        </li>
                        <li className="item ">
                            <a href="./home.html#gotoDashboard">Dashboard</a>
                        </li>
                        <li className="item">
                            <a href="./home.html#aboutus">About</a>
                        </li>
                    </ul>
                </div>
                {this.state.isOwner ? <Owner /> : <Voters />}
            </div>
        );
    }
}

export default Vote;

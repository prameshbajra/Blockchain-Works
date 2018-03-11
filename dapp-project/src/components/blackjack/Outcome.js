import React, { Component } from 'react';

import Blackjack from '../../../build/contracts/Blackjack.json';
import getWeb3 from '../../utils/getWeb3';

class Outcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
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
    static defaultProps = {
        status: "playing"
    }
    ifWin = () => {
        let blackjackContractInstance;
        const contract = require('truffle-contract');
        const blackJackContract = contract(Blackjack);
        blackJackContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            blackJackContract.deployed().then((instance) => {
                blackjackContractInstance = instance;
                return blackjackContractInstance.ifWin({ from: accounts[0] });
            }).then((result) => {
                console.log("If win ko bata aako result", result);
            })
        });
    }
    render() {
        switch (this.props.status) {
            case "playing":
                return (<div className="alert alert-info" role="alert" > Hit or Stand</div>);
            case "win":
                this.ifWin();
                return (<div className="alert alert-success" role="alert">Win Win Win</div>);
            case "lose":
                return (<div className="alert alert-danger" role="alert">You Lose</div>);
            default:
                return (<div className="alert alert-info" role="alert">Click Deal to Start ! </div>);
        }
    }
}


export default Outcome;

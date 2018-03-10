import React, { Component } from 'react';

import Outcome from './Outcome';
import Blackjack from '../../../build/contracts/Blackjack.json';
import getWeb3 from '../../utils/getWeb3';

class Interface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            message: null,
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
    deal = (e) => {
        e.preventDefault();
        const betAmount = e.target.betAmount.value;
        let blackjackContractInstance;
        const contract = require('truffle-contract');
        const blackJackContract = contract(Blackjack);
        blackJackContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            blackJackContract.deployed().then((instance) => {
                blackjackContractInstance = instance;
                return blackjackContractInstance.startGame({
                    value: this.state.web3.toWei(betAmount, 'ether'),
                    from: accounts[0]
                });
            }).then((result) => {
                console.log(result);
                if (!result) {
                    this.setState(() => ({ message: "There was some problem in your game. Please try again!" }));
                } else {
                    this.setState(() => ({ message: "Let the game begin!!" }))
                    this.props.deal();
                    setTimeout(() => {
                        this.setState(() => ({ message: null }))
                    }, 2000);
                }
            })
        });
    }
    cashOut = () => {
        let blackjackContractInstance;
        const contract = require('truffle-contract');
        const blackJackContract = contract(Blackjack);
        blackJackContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            blackJackContract.deployed().then((instance) => {
                blackjackContractInstance = instance;
                return blackjackContractInstance.redeem({ gas: 1000000, from: accounts[0] });
            }).then((result) => {
                console.log(result);
                if (result) {
                    this.setState(() => ({ message: "Transaction is successfully done." }));
                    setTimeout(() => {
                        this.setState(() => ({ message: null }))
                    }, 2000);
                } else {
                    this.setState(() => ({ message: "Please try again later, Transaction error!" }));
                }
            })
        });
    }

    render() {
        return (
            <div>
                {/* Outcome component child of Interface */}
                <center>
                    <h4>{this.state.message}</h4>
                    <Outcome status={this.props.status} />
                </center>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <h4>Dealer Score : {this.props.dealerscore}</h4>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <h4 className="text-right">Player Score : {this.props.playerscore}</h4>
                    </div>
                </div>
                <br />
                <div className="row">
                    {
                        this.props.status !== "playing" ?
                            <div className="col-lg-6 col-md-6">
                                <form onSubmit={this.deal}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <input type="number" name="betAmount"
                                                className="form-control"
                                                placeholder="Enter the bet amount. (In Ether )" />
                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-outline-danger">Start Game</button>
                                        </div>
                                    </div>
                                </form>
                            </div> :
                            null
                    }
                    <div className="col-lg-2 col-md-2">
                        {/* refactor this  */}
                        {/* refactor this  */}
                        {/* refactor this  */}
                        {/* refactor this  */}
                        {
                            this.props.visible ?
                                this.props.playerscore > 21 || this.props.dealerscore > 21 ?
                                    <button onClick={this.props.hit} type="button" className="btn btn-block btn-success" disabled>
                                        Hit
                                </button>
                                    :
                                    <button onClick={this.props.hit} type="button" className="btn btn-block btn-outline-success">
                                        Hit
                                </button>
                                :
                                <button onClick={this.props.hit} type="button" className="btn btn-block btn-success" disabled>
                                    Hit
                                </button>
                        }
                    </div>
                    <div className="col-lg-2 col-md-2">
                        {
                            this.props.visible ?
                                this.props.playerscore > 21 || this.props.dealerscore > 21 ?
                                    <button onClick={this.props.stand} type="button" className="btn btn-block btn-danger" disabled>
                                        Stand
                                </button>
                                    :
                                    <button onClick={this.props.stand} type="button" className="btn btn-block btn-outline-danger">
                                        Stand
                                </button>
                                :
                                <button onClick={this.props.stand} type="button" className="btn btn-block btn-danger" disabled>
                                    Stand
                                </button>
                        }
                    </div>
                    <div className="col-lg-2 col-md-2">
                        {
                            this.props.status === "win" ?
                                <button className="btn btn-block btn-outline-info" onClick={this.cashOut} >Cash Out</button>
                                :
                                <button className="btn btn-block btn-info" onClick={this.cashOut} disabled>Cash Out</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Interface;

import React, { Component } from 'react'
import SimpleDemoContract from '../../build/contracts/SimpleDemo.json'
import getWeb3 from '../utils/getWeb3'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../css/App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null
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

    instantiateContract() {
        const contract = require('truffle-contract')
        const simpleDemo = contract(SimpleDemoContract)
        simpleDemo.setProvider(this.state.web3.currentProvider)
        var simpleDemoInstance;
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            simpleDemo.deployed().then((instance) => {
                simpleDemoInstance = instance
                // Stores a given value, 9 by default.
                console.log(accounts);
                // Getting error here ... This line ...
                return simpleDemoInstance.getBalance(accounts[0], { from: accounts[0] })
            }).then((returnedResults) => {
                // console.log(returnedResults)
                return simpleDemoInstance.getBalance(accounts[0], { from: accounts[0] })
            }).then((result) => {
                console.log(result);
                // Update state with the result.
                return this.setState({ storageValue: result.c[0] })
            })
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Good to Go!</h1>
                <h3 className="text-center">
                    <button onClick={(e) => { this.instantiateContract() }}>Send</button>
                </h3>
            </div>
        );
    }
}

export default App

import React, { Component } from 'react'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'
import { Provider } from 'react-redux'
import store from '../store/store'

import Header from '../components/Header';

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../css/App.css'

const storeInstance = store();

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
            this.instantiateContract()
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const simpleStorage = contract(SimpleStorageContract)
        simpleStorage.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        let simpleStorageInstance;
        this.state.web3.eth.getAccounts((error, accounts) => {
            simpleStorage.deployed().then((instance) => {
                simpleStorageInstance = instance
                // Stores a given value, 9 by default.
                return simpleStorageInstance.set(9, { from: accounts[0] })
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                return simpleStorageInstance.get.call(accounts[0])
            }).then((result) => {
                // Update state with the result.
                return this.setState({ storageValue: result.c[0] })
            })
        })
    }

    render() {
        return (
            <Provider store={storeInstance}>
                <div className="container">
                    <Header />
                </div>
            </Provider>
        );
    }
}

export default App

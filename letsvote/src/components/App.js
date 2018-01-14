import React, { Component } from 'react'
import VotingContract from '../../build/contracts/Voting.json'
import getWeb3 from '../utils/getWeb3'
import { Provider } from 'react-redux'
import store from '../store/store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import CandidateList from '../components/CandidateList'
import AddCandidate from '../components/AddCandidate'

import '../css/App.css'

const storeInstance = store();

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            allCandidates: []
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
        let votingContractInstance;
        const contract = require('truffle-contract')
        const votingContract = contract(VotingContract)
        votingContract.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            votingContract.deployed().then((instance) => {
                votingContractInstance = instance
                // Stores a given value, 9 by default.
                return votingContractInstance.getAllCandidates.call();
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                this.setState(() => ({
                    allCandidates: result
                }));
            })
        })
    }

    render() {
        console.log(this.props);
        return (
            <Provider store={storeInstance}>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Switch>
                            <Route exact path="/addCandidate" component={AddCandidate} />
                            <Route exact path="/" component={CandidateList} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

import React, { Component } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../../css/App.css';
import { DateRangePicker } from 'react-dates';

import Election from '../../../build/contracts/Election.json';
import getWeb3 from '../../utils/getWeb3';

import CandidateList from './CandidateList';

class Owner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            candidateName: null,
            candidatesCount: null,
            startDate: null,
            endDate: null,
            startSolDate: null,
            endSolDate: null,
            focusedInput: null,
            message: "Fill the above form please :D",
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

    addCandidate = (e) => {
        e.preventDefault();
        const candidateName = e.target.candidateName.value;
        if (candidateName.length > 5) {
            let electionContractInstance;
            const contract = require('truffle-contract');
            const electionContract = contract(Election);
            electionContract.setProvider(this.state.web3.currentProvider);
            this.state.web3.eth.getAccounts((error, accounts) => {
                electionContract.deployed().then((instance) => {
                    electionContractInstance = instance;
                    return electionContractInstance.addCandidate(candidateName, { from: accounts[0] });
                }).then((result) => {
                    return electionContractInstance.candidatesCount.call();
                }).then((result2) => {
                    this.setState(() => ({ candidatesCount: result2.c[0], candidateName }));
                }).catch((error) => {
                    this.setState(() => ({ message: "You are not allowed to do this, Sorry !" }));
                });
            })
        } else {
            this.setState(() => ({ message: "The Candidates name should be greater than 5 characters." }))
        }
    }

    dateHandler = () => {
        const startDate = JSON.stringify(this.state.startDate).slice(1, 11);
        const endDate = JSON.stringify(this.state.endDate).slice(1, 11);
        let electionContractInstance;
        const contract = require('truffle-contract');
        const electionContract = contract(Election);
        electionContract.setProvider(this.state.web3.currentProvider);
        if (startDate.length === 10 && endDate.length === 10) {
            this.state.web3.eth.getAccounts((error, accounts) => {
                electionContract.deployed().then((instance) => {
                    electionContractInstance = instance;
                    return electionContractInstance.setTimer(startDate, endDate, { from: accounts[0] });
                }).then((result) => {
                    return electionContractInstance.startDate.call();
                }).then((result) => {
                    this.setState(() => ({ startSolDate: this.state.web3.toAscii(result).replace(/\u0000/g, '') }));
                    return electionContractInstance.endDate.call();
                }).then((result) => {
                    this.setState(() => ({
                        endSolDate: this.state.web3.toAscii(result).replace(/\u0000/g, ''),
                        message: "The election started."
                    }));
                }).catch((error) => {
                    this.setState(() => ({ message: "You are not allowed to do this, Sorry !" }));
                });
            })
        } else {
            this.setState(() => ({ message: "It seems you haven't selected the dates. Please select the dates." }));
        }
    }

    render() {
        return (
            <div>
                <div className={this.state.formVisibility}>
                    <form onSubmit={this.addCandidate}>
                        <input type="text" name="candidateName" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                    {
                        this.state.candidateName ?
                            (<p>{this.state.candidateName} has been successfully registered. <br />
                                Total registered candidate : {this.state.candidatesCount}</p>) : null
                    }
                    <br />
                    <CandidateList />
                    <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    />
                    <button onClick={this.dateHandler}>Start Election</button>
                </div>
                {this.state.message}
            </div>
        );
    }
}

export default Owner;

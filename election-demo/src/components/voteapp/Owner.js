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
            message: "Fill the above form please.",
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
        // The startDate and endDates are sliced to fit exactly 10 characters ...
        if (startDate.length === 10 && endDate.length === 10) {
            this.state.web3.eth.getAccounts((error, accounts) => {
                electionContract.deployed().then((instance) => {
                    electionContractInstance = instance;
                    return electionContractInstance.setTimer(startDate, endDate, { from: accounts[0] });
                }).then((result) => {
                    // calling startDate/endDate here is prolly not required,
                    // because startDate/endDate variable(string of length 10)
                    // that can be converted to number is  available in scope ...

                    // clean up this part of the code later if time allows ...
                    // Horrible hack / monkey patch ahead ...
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
                    <div className="votebody">
                        <div className="formlist">
                            <h3>Add Candidates</h3>
                            <form className="candidateform" onSubmit={this.addCandidate}>
                                <input type="text" className="form-control" name="candidateName" placeholder="Enter Candidate Name" />
                                <br />
                                <button type="submit" className="btn btn-outline-danger"><a>Submit</a></button>
                            </form>
                            {
                                this.state.candidateName ?
                                    (<div className="message">{this.state.candidateName} has been successfully registered. <br />
                                        Total registered candidate : {this.state.candidatesCount}</div>) : null
                            }
                            <CandidateList />
                        </div>
                        <div className="betweenline"></div>
                        <div className="dates">
                            <h5>Select the start date and end date for the election.</h5><br />
                            <DateRangePicker
                                startDate={this.state.startDate}
                                startDateId="your_unique_start_date_id"
                                endDate={this.state.endDate}
                                endDateId="your_unique_end_date_id"
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({ focusedInput })}
                            />
                            <br /><br /><br /><br /><br /><br /><br />
                            <h6>Note : </h6>
                            The election will start after you press the button below.<br />
                            You can further add candidates in case you have forgotten to add them early on. <br />
                            <br />
                            <button className="btn btn-outline-danger btn-lg btn-block" onClick={this.dateHandler}>
                                Start Election
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="container">
                    <div className="card card-body bg-light">
                        {this.state.message}
                    </div>
                </div>
            </div>
        );
    }
}

export default Owner;

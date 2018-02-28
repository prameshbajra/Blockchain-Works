import React, { Component } from 'react';

import RealEstate from '../../../build/contracts/RealEstate.json';
import getWeb3 from '../..//utils/getWeb3';

class AddHouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            houseName: null,
            houseCount: null,
            houseLocation: null,
            housePrice: null,
            message: null
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

    addHouse = (e) => {
        e.preventDefault();
        const houseName = e.target.houseName.value;
        const houseLocation = e.target.houseLocation.value;
        const housePrice = e.target.housePrice.value;
        if (houseName.length > 5 && houseLocation.length > 5) {
            let realEstateContractInstance;
            const contract = require('truffle-contract');
            const realEstateContract = contract(RealEstate);
            realEstateContract.setProvider(this.state.web3.currentProvider);
            this.state.web3.eth.getAccounts((error, accounts) => {
                realEstateContract.deployed().then((instance) => {
                    realEstateContractInstance = instance;
                    return realEstateContractInstance.addHouse(houseName, houseLocation, housePrice, { from: accounts[0] });
                }).then((result) => {
                    return realEstateContractInstance.houseCount.call();
                }).then((result2) => {
                    console.log(result2);
                    this.setState(() => ({ houseCount: result2.c[0], houseName }));
                })
            })
        } else {
            this.setState(() => ({ message: "The house location or the house name is invalid." }))
        }
    }

    render() {
        return (
            <div className="container">
                <br /><br />
                <div className="row">
                    <div className="col-md-6">
                        <h2>Enter details for the house to sell. </h2>
                        <br />
                        <form onSubmit={this.addHouse}>
                            <br />
                            <h5>House Name</h5>
                            <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Enter house name" name="houseName" />
                            <br />
                            <h5>House Location</h5>
                            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter House Location" name="houseLocation" />
                            <br />
                            <h5>House Price</h5>
                            <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Price" name="housePrice" />
                            <br />
                            <button type="submit" className="btn btn-outline-danger btn-block">Submit</button>
                            <br />
                        </form>
                    </div>
                    <br /><br /><br />
                    <div className="col-md-6">
                        {
                            this.state.houseName ?
                                (<div className="card card-body bg-light">{this.state.houseName} has been successfully registered.
                                <br />
                                    Total registered houses : {this.state.houseCount}</div>) : null
                        }
                        <br />
                        <div className="card card-body bg-light">
                            {this.state.message}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddHouse;
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
            <div>
                <h2 className="text-center"> Add House for sale ... </h2>
             <div className="houseform">
                < center>
                 <form onSubmit={this.addHouse}>
  <div class="form-group  ">

   HouseName <div className="col-md-4"><input type="text" className="form-control" id="formGroupExampleInput" placeholder="House Name" name="houseName"/>
  </div></div>
  <div class="form-group ">
    <label for="formGroupExampleInput2" >Location</label>
    <div className="col-md-4"><input type="text" className="form-control" id="formGroupExampleInput2" placeholder="House Location" name="houseLocation" />
  </div></div>
  <div class="form-group">
    <label for="formGroupExampleInput3">Price</label>
    <div className="col-md-4"><input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Price" name="housePrice" />
  </div></div>
   <button type="submit"  className="btn btn-danger btn-lg ">Submit</button>
</form></center>

                </div>
                {
                    this.state.houseName ?
                        (<p>{this.state.houseName} has been successfully registered for {this.state.housePrice} wei. <br />
                            Total registered houses : {this.state.houseCount}</p>) : null
                }
                <br />
                {/* <CandidateList /> */}
                {this.state.message}
            </div>
        );
    }
}

export default AddHouse;
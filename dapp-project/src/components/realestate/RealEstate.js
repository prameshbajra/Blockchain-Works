import React, { Component } from 'react';

import AddHouse from './AddHouse';
import HouseList from './HouseList';

import RealEstate from '../../../build/contracts/RealEstate.json';
import getWeb3 from '../..//utils/getWeb3';

class RealEstates extends Component {
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
            this.initial();
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    initial = () => {
        const contract = require('truffle-contract');
        const realEstateContract = contract(RealEstate);
        realEstateContract.setProvider(this.state.web3.currentProvider);
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
                <AddHouse />
                <HouseList />
            </div>
        );
    }
}

export default RealEstates;

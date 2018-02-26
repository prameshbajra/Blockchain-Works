import React, { Component } from 'react';

// import Timer from './Timer';
import '../../css/styles.css';
import RealEstate from '../../../build/contracts/RealEstate.json';
import getWeb3 from '../../utils/getWeb3';

// import moment from 'moment';

class HouseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            houseArray: [],
            locationArray: [],
            priceArray: [],
            // message: undefined,
            // startDate: null,
            // endDate: null
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            })
            this.renderList();
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    renderList = () => {
        let realEstateContractInstance;
        const contract = require('truffle-contract');
        const realEstateContract = contract(RealEstate);
        realEstateContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            realEstateContract.deployed().then((instance) => {
                realEstateContractInstance = instance;
                // return realEstateContractInstance.startDate.call();
                // })
                // .then((result) => {
                //     this.setState(() => ({ startDate: result }));
                //     return electionContractInstance.endDate.call();
                // }).then((result) => {
                //     this.setState(() => ({ endDate: result }));
                return realEstateContractInstance.houseCount.call();
            })
                .then((count) => {
                    // const startDate = this.state.web3.toAscii(this.state.startDate).replace(/\u0000/g, '');
                    // const endDate = this.state.web3.toAscii(this.state.endDate).replace(/\u0000/g, '');
                    // console.log(moment(startDate).unix(), moment(endDate).unix());
                    // if (moment('2018-09-09').unix() >= moment(startDate).unix() && moment('2018-09-09').unix() <= moment(endDate).unix()) {
                    for (let i = 1; i <= count; i++) {
                        realEstateContractInstance.houses.call(i)
                            .then((result) => {
                                // Destructuring previous array and adding to last.
                                this.setState(() => ({
                                    houseArray: [...this.state.houseArray, result[1]],
                                    locationArray: [...this.state.locationArray, result[2]],
                                    priceArray: [...this.state.priceArray, result[3].c[0]]

                                }));
                            });
                    }
                    // } else {
                    // this.setState(() => ({ message: "The elections are already over." }))
                    // }
                })
        })
    }

    buyHouse = (e, id) => {
        let realEstateContractInstance;
        const contract = require('truffle-contract');
        const realEstateContract = contract(RealEstate);
        realEstateContract.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            realEstateContract.deployed().then((instance) => {
                realEstateContractInstance = instance;
                return realEstateContractInstance.houses.call(id)
                    .then((res) => {
                        console.log(res);
                        const price = res[3].c[0];
                        // *Math.pow(10,res[3].e)/1000;
                        // console.log(parseFloat(price).toFixed(18));
                        return realEstateContractInstance.buy(id, { value: price, from: accounts[0] });
                    }).then((result) => {
                        this.setState(() => ({ message: "transaction complete." }));
                    }).catch((error) => {
                        console.log("error", error);
                        this.setState(() => ({ message: "transaction error." }))
                    })
            })
        })
    }

    render() {
        return (
            <div>
                Houses for sale
                <div>
                    {
                        this.state.houseArray.map((house, i) => {
                            return (
                                <div className="box" key={i}>
                                    <li key={i + 1}>
                                        <img alt="Here" />
                                        <br />
                                        Name/Title:
                                    {this.state.web3.toAscii(house).replace(/\u0000/g, '')}
                                        <br />
                                        Location:
                                    {this.state.web3.toAscii(this.state.locationArray[i]).replace(/\u0000/g, '')}
                                        <br />
                                        Price:
                                    {this.state.priceArray[i]}
                                        {
                                            (<button onClick={(e) => this.buyHouse(e, i + 1)}>
                                                BUY
                                            </button>)
                                        }
                                    </li>
                                </div>
                            );
                        })
                    }
                    {this.state.message}
                </div>
                {/* <Timer /> */}
            </div>
        );
    }
}

export default HouseList;
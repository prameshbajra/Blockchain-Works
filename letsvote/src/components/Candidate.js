import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';

class Candidate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: null,
            allCandidates: []
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState(() => ({
                web3: results.web3
            }))
            this.instantiateContract()
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-4 col-md-3">
                    <div className="thumbnail">
                        <div className="caption">
                            <h3>
                                {this.state.web3 ?
                                    this.state.web3.toAscii(this.props.candidateName).replace(/\u0000/g, '') :
                                    "Loading ..."}
                            </h3>
                            <h6>Some description ta hola ni </h6>
                            <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Candidate;
import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';
import CandidateContract from '../../build/contracts/CandidateContract.json'

class Candidate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                candidate
            </div>
        );
    }
}

export default Candidate;

import React, { Component } from 'react';

import Candidate from './Candidate';
import Voters from './Candidate';

import getWeb3 from '../utils/getWeb3';
import VotingContract from '../../build/contracts/Voting.json'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Candidate />
                <Voters />
            </div>
        );
    }
}

export default Home;
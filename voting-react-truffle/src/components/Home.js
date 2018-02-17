import React, { Component } from 'react';

import Candidate from './Candidate';
import Voters from './Voters';

// import getWeb3 from '../utils/getWeb3';
// import VotingContract from '../../build/contracts/VotingContract.json'

class Home extends Component {
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
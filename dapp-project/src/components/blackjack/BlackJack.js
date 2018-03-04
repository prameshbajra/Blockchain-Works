import React, { Component } from 'react';

import _ from 'lodash';

import Table from './Table';

class BlackJack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: [
                { v: 11, f: "c1" }, { v: 2, f: "c2" }, { v: 3, f: "c3" }, { v: 4, f: "c4" }, { v: 5, f: "c5" }, { v: 6, f: "c6" },
                { v: 7, f: "c7" }, { v: 8, f: "c8" }, { v: 9, f: "c9" }, { v: 10, f: "c10" }, { v: 10, f: "c11" }, { v: 10, f: "c12" }, { v: 10, f: "c13" },
                { v: 11, f: "h1" }, { v: 2, f: "h2" }, { v: 3, f: "h3" }, { v: 4, f: "h4" }, { v: 5, f: "h5" }, { v: 6, f: "h6" },
                { v: 7, f: "h7" }, { v: 8, f: "h8" }, { v: 9, f: "h9" }, { v: 10, f: "h10" }, { v: 10, f: "h11" }, { v: 10, f: "h12" }, { v: 10, f: "h13" },
                { v: 11, f: "s1" }, { v: 2, f: "s2" }, { v: 3, f: "s3" }, { v: 4, f: "s4" }, { v: 5, f: "s5" }, { v: 6, f: "s6" },
                { v: 7, f: "s7" }, { v: 8, f: "s8" }, { v: 9, f: "s9" }, { v: 10, f: "s10" }, { v: 10, f: "s11" }, { v: 10, f: "s12" }, { v: 10, f: "s13" },
                { v: 11, f: "d1" }, { v: 2, f: "d2" }, { v: 3, f: "d3" }, { v: 4, f: "d4" }, { v: 5, f: "d5" }, { v: 6, f: "d6" },
                { v: 7, f: "d7" }, { v: 8, f: "d8" }, { v: 9, f: "d9" }, { v: 10, f: "d10" }, { v: 10, f: "d11" }, { v: 10, f: "d12" }, { v: 10, f: "d13" }
            ]
        }
    }
    shuffleDeck = (deck) => {
        return _.shuffle(_.shuffle(_.shuffle(_.shuffle(deck))));
    }
    render() {
        return (
            <div className="container">
                <Table deck={this.shuffleDeck(this.state.deck)} />
            </div>
        );
    }
}

export default BlackJack;


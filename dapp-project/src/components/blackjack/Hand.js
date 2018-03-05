import React, { Component } from 'react';

import Card from './Card';

class Hand extends Component {
    static defaultProps = {
        hand: []
    }
    render() {
        return (
            <div className="row">
                {this.props.showDeck ? <Card hidden={true} /> : ''}
                {this.props.hand.map((card, i) => {
                    return (
                        <Card face={card.f} value={card.v} key={i} />
                    )
                })}
            </div>
        );
    }
}

export default Hand;

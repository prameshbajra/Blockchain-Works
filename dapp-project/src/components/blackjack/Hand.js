import React, { Component } from 'react';

import Card from './Card';

class Hand extends Component {
    static defaultProps = {
        hand: []
    }
    render() {
        return (
            <div>
                {this.props.showDeck ? <Card hidden={true} /> : ''}
                {/* here we iterate the hand array and serve the Card component with the card info */}
                {this.props.hand.map((card, i) => {
                    return <Card face={card.f} value={card.v} key={i} />
                })}
            </div>
        );
    }
}

export default Hand;

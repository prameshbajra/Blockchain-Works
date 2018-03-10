import React, { Component } from 'react';
import _ from 'lodash';

import Hand from "./Hand";
import Interface from "./Interface";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: _.shuffle(this.props.deck),
            player: [],
            dealer: [],
            hidden: true,
            visible: false,
            status: "new"
        };
    }

    handScore = (hand) => {
        let score = _.sumBy(hand, 'v');
        if (score > 21) {
            //check for aces
            var aces = _.countBy(hand, { v: 11 }).true;
            while (score > 21 && aces > 0) {
                score -= 10;
                aces -= 1;
            }
        }
        return score;
    }

    handleDealButton = () => {
        let deck = this.state.deck;
        const playerhand = [];
        const dealerhand = [];
        //check deck size to see if we need to shuffle a new deck
        if (deck.length < 5) {
            deck = _.shuffle(this.props.deck);
        }
        //player hand, deal 2 cards
        playerhand.push(deck.pop());
        playerhand.push(deck.pop());

        //lets just burn a card
        deck.pop();

        //dealer card
        // since we are using client side state the dealer secret card is only popped out
        // of the deal at the time the user clicks Stand.
        dealerhand.push(deck.pop());

        //set the updates
        this.setState({
            player: playerhand,
            dealer: dealerhand,
            deck: deck,
            hidden: true,
            visible: true,
            status: "playing"
        });
    }

    handleHitButton = () => {
        let newStatus = this.state.status;
        const playerHand = this.state.player;

        // check deck size to see if we need to shuffle a new deck
        if (this.state.deck.length < 5) {
            this.setState(() => ({ deck: _.shuffle(this.state.deck) }));
        }

        // we shuffle every time so you don't cheat by checking component state :D
        const shuffled = _.shuffle(this.state.deck);

        // deal the card
        playerHand.push(shuffled.pop());

        const newPlayerscore = this.handScore(playerHand);
        // five card charlie
        if (newPlayerscore < 21 && playerHand.length === 5)
            newStatus = "win";
        if (newPlayerscore > 21)
            newStatus = "lose";

        // set the updates
        this.setState({
            player: playerHand,
            playerscore: newPlayerscore,
            deck: shuffled,
            status: newStatus
        });
    }

    handleStandButton = () => {
        const dealerHand = this.state.dealer;
        let deck = this.state.deck;
        if (deck.length < 5) {
            deck = _.shuffle(this.props.deck);
        }

        // we shuffle every time so you don't cheat by checking component state :D
        const shuffled = _.shuffle(deck);

        // update scores for the interface component
        let dealerScore = this.handScore(dealerHand);
        const playerScore = this.handScore(this.state.player);
        let dealerHasCharlie = false;

        // compute game status while dealing cards to the dealer
        while (dealerScore < playerScore || dealerScore <= 17) {

            // deal a card
            dealerHand.push(shuffled.pop());
            dealerScore = this.handScore(dealerHand);

            if (dealerScore < 21 && dealerHand.length === 5) {
                // five card charlie
                dealerHasCharlie = true;
                break;
            }

        }

        // update the state constiables accordingly
        this.setState({
            dealer: dealerHand,
            deck: shuffled,
            hidden: false,
            // compute game status
            visible: false,
            status: (dealerScore <= 21 || dealerHasCharlie) ? 'lose' : 'win'
        });
    }

    render() {
        return (
            <div className='table-board'>
                <Hand
                    showDeck={this.state.hidden}
                    hand={this.state.dealer}
                />
                <hr />
                <Interface
                    playerscore={this.handScore(this.state.player)}
                    dealerscore={this.handScore(this.state.dealer)}
                    deal={this.handleDealButton}
                    hit={this.handleHitButton}
                    stand={this.handleStandButton}
                    status={this.state.status}
                    visible={this.state.visible}
                />
                <hr />
                <Hand
                    hand={this.state.player}
                />
            </div>
        );
    }
}

export default Table;

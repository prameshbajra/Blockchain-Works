import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Vote from './voteapp/Vote';
import RealEstate from './realestate/RealEstate';
import BlackJack from './blackjack/BlackJack';
import NotFound from './voteapp/NotFound';

import '../css/App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/vote" component={Vote} />
                    <Route exact path="/realEstate" component={RealEstate} />
                    <Route exact path="/blackJack" component={BlackJack} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter >
        );
    }
}

export default App;

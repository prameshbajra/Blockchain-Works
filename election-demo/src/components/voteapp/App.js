import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Vote from './Vote';
import NotFound from './NotFound';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/vote" component={Vote} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter >
        );
    }
}

export default App;

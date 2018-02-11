import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import NotFound from '../components/NotFound';

import '../css/App.css'

const storeInstance = store();

class App extends Component {
    render() {
        return (
            <Provider store={storeInstance}>
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route exact path="/home" component={Home} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

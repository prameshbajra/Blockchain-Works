import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import CandidateList from '../components/CandidateList'
import AddCandidate from '../components/AddCandidate'

import '../css/App.css'

const storeInstance = store();

class App extends Component {
    render() {
        return (
            <Provider store={storeInstance}>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Switch>
                            <Route exact path="/addCandidate" component={AddCandidate} />
                            <Route exact path="/" component={CandidateList} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

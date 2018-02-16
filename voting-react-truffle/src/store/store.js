import { createStore, combineReducers } from 'redux';

import VoteReducers from '../reducers/VoteReducers';

export default () => {
    const store = createStore(
        combineReducers({
            VoteReducers: VoteReducers
            // Reducers mapping goes here ...
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
    return store;
}
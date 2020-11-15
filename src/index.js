import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {createBrowserHistory} from "history";
import {Provider} from "react-redux";
import {Router, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));
const history = createBrowserHistory();
 const API_ROOT =  `http://microservice-a/api`;

ReactDOM.render(
<Provider store={store}>
    <Router history={history}>
        <Route path="/">
            <App url={API_ROOT} />
        </Route>
    </Router>
</Provider>,
document.getElementById('root')
);

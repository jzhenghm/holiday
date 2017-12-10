import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

import * as reducers from './store/reducers.js';
//import registerServiceWorker from './registerServiceWorker';
require('./App.css');
const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
document.getElementById('root'));
//registerServiceWorker();
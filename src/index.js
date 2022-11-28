import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
//import {createStore} from 'redux'; DEPRECATED
import { configureStore } from '@reduxjs/toolkit';
import {searchRobots, requestRobots} from './reducers';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import {createLogger} from 'redux-logger';      //  For logging prev state/action/next state in the console
import thunkMiddleWare from 'redux-thunk';

const logger = createLogger();
const store = configureStore({
  reducer: {
    searchRobots: searchRobots, 
    requestRobots: requestRobots
  },
  middleware: [thunkMiddleWare, logger],
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

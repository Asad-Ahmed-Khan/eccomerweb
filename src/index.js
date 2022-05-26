import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

//redux
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// reducers import
import authReducer from "./redux/reducers/authReducer";
import postReducer from "./redux/reducers/postReducer";



// composers
const composedEnhancers = composeWithDevTools || compose;

// reducers
const reducers = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

// store
const store = createStore(reducers, composedEnhancers(applyMiddleware(thunk)));


// ReactDOM.render(

//   <App />,
  
//   document.getElementById('root')
// );


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login/Login';
import Signup from  './signup/Signup';
import Dashboard from './dashboard/Dashboard';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
    apiKey: "AIzaSyAmYPA8P0TrmFxz_UwLij67t-XD03egPzg",
    authDomain: "chatapp-36ea4.firebaseapp.com",
    databaseURL: "https://chatapp-36ea4.firebaseio.com",
    projectId: "chatapp-36ea4",
    storageBucket: "chatapp-36ea4.appspot.com",
    messagingSenderId: "1088847615660",
    appId: "1:1088847615660:web:6f8b90be4e1aeaee"
});


const routing = (
    <div id='app'>
      <Router>
        <div id='routing-container'>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={Signup}></Route>
          <Route exact path='/' component={Dashboard}></Route>
        </div>
      </Router>
    </div>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

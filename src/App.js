import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Login from './Login/index'

import Home from './Home/index';

import Registration from './Registration/index';

import './App.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                </div>
            </Router>
        )
    }
}








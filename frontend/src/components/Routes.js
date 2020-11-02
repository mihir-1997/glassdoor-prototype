import React, { Component } from 'react'
import { Route } from "react-router-dom"

import Navbar from './Navbar/Navbar'
import Login from './Entry/Login'
import Signup from './Entry/SignUp'

class Routes extends Component {
    render () {
        return (
            <div>
                <Route path="/" component={ Navbar } />
                <Route path="/login" component={ Login } />
                <Route path="/signup" component={ Signup } />
            </div>
        )
    }
}

export default Routes;
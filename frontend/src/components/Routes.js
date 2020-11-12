import React, { Component } from 'react'
import { Route } from "react-router-dom"

import Navbar from './Navbar/Navbar'
import Login from './Entry/Login'
import Signup from './Entry/SignUp'
import Dashboard from './Students/Landing/Dashboard'
import UserProfile from './Students/Profile/UserProfile'
import JobLanding from './Students/JobSearch/JobLanding'

import EmployerProfile from './Employer/Profile/EmployerProfile'

class Routes extends Component {
    render () {
        return (
            <div>
                <Route path="/" component={ Navbar } />
                <Route path="/login" component={ Login } />
                <Route path="/signup" component={ Signup } />
                <Route path="/userdashboard" component={ Dashboard } />
                <Route path="/user/profile" component={ UserProfile } />
                <Route path="/user/jobs" component={ JobLanding } />
                <Route path="/employer/profile" component={ EmployerProfile }/>
            </div>
        )
    }
}

export default Routes;
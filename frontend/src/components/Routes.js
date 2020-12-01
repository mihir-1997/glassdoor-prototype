import React, { Component } from 'react'
import { Route } from "react-router-dom"

import Navbar from './Navbar/Navbar'
import Login from './Entry/Login'
import Signup from './Entry/SignUp'
import Dashboard from './Students/Landing/Dashboard'
import StudentProfile from './Students/Profile/StudentProfile'
import JobLanding from './Students/JobSearch/JobLanding'
import CompanySearch from './Students/CompanySearch/CompanySearch'
import Contributions from './Students/Contributions/Contributions'
import AddContribution from './Students/Contributions/AddContribution'
import DonutChart from './Charts/Donutchart/Donutchart'
import AdminDashboard from './Admin/Dashboard/AdminDashboard'

class Routes extends Component {
    render () {
        return (
            <div>
                <Route path="/" component={ Navbar } />
                <Route path="/login" component={ Login } />
                <Route path="/signup" component={ Signup } />
                <Route path="/studentdashboard" component={ Dashboard } />
                <Route path="/students/profile" component={ StudentProfile } />
                <Route path="/students/jobs" component={ JobLanding } />
                <Route path="/students/companies" component={ CompanySearch } />
                <Route path="/students/contributions" component={ Contributions } />
                <Route path="/students/addcontribution" component={ AddContribution } />
                <Route path="/students/applications" component={ JobLanding } />
                <Route path="/students/charts" component={ DonutChart } />
                <Route path="/admin/dashboard" component={ AdminDashboard } />
                <Route path="/admin/companies" component={ CompanySearch } />
            </div>
        )
    }
}

export default Routes;
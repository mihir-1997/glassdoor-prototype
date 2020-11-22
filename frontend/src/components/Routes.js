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

import EmployerProfile from './Employer/Profile/EmployerProfile'
import EmployerReviews from './Employer/Reviews/EmployerReviews'
import EmployerInterviews from './Employer/Interviews/EmployerInterviews'
import EmployerSalaries from './Employer/Salaries/EmployerSalaries'
import EmployerPhotos from './Employer/Photos/EmployerPhotos'
import EmployerJobs from './Employer/Jobs/EmployerJobs'

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
                {/* Employer Routes */}
                <Route path="/employer/profile" component={ EmployerProfile }/>
                <Route path="/employer/reviews" component={ EmployerReviews }/>
                <Route path="/employer/jobs" component={ EmployerJobs }/>
                <Route path="/employer/salaries" component={ EmployerSalaries }/>
                <Route path="/employer/interviews" component={ EmployerInterviews }/>
                <Route path="/employer/photos" component={ EmployerPhotos }/>
            </div>
        )
    }
}

export default Routes;
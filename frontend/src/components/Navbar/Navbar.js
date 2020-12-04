import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from "react-router"
import { Typeahead } from 'react-bootstrap-typeahead'

import Glassdoor_logo from '../../Images/glassdoor-logo.svg'
import './Navbar.css'

import { BACKEND_URL, BACKEND_PORT } from '../Config/Config'

class Navbar extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            searchTerm: "",
            location: "",
            redirectToJobs: false,
            redirectToCompanies: false,
            redirectToInterviews: false,
            redirectToSalaries: false,
            dropDownValue: "Jobs",
            employerName: "",
            employerID: ""
        }
    }

    componentDidMount () {
        if ( localStorage.getItem( "active" ) === "admin" ) {
            this.setState( {
                searchTerm: "",
                location: "",
                redirectToJobs: false,
                dropDownValue: "Companies"
            } )
        } else if ( localStorage.getItem( "active" ) === "students" ) {
            this.setState( {
                searchTerm: "",
                location: "",
                redirectToJobs: false,
                dropDownValue: "Jobs"
            } )
        }
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/employers/getAllEmployers" )
            .then( ( res ) => {
                if ( res.status === 200 ) {
                    this.setState( {
                        employers: res.data
                    } )
                }
            } )
            .catch( ( err ) => {
                if ( err.response ) {
                    if ( err.response.status === 404 ) {
                        console.log( err.response.message )
                    } else if ( err.response.status === 400 ) {
                        console.log( err.response.message )
                    }
                }
            } )
    }

    onChange = ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    dropDownClick = ( e ) => {
        e.preventDefault()
        this.setState( {
            dropDownValue: e.target.value
        } )
    }

    searchJobs = ( e ) => {
        e.preventDefault()
        if ( localStorage.getItem( "active" ) === "admin" ) {
            if ( this.state.employerName && this.state.dropDownValue === "Companies" ) {
                this.setState( {
                    redirectToCompanies: !this.state.redirectToCompanies
                } )
            }
        } else if ( localStorage.getItem( "active" ) === "students" ) {
            if ( this.state.searchTerm && this.state.dropDownValue === "Jobs" ) {
                this.setState( {
                    redirectToJobs: !this.state.redirectToJobs
                } )
            } else if ( this.state.employerName && this.state.dropDownValue === "Companies" ) {
                this.setState( {
                    redirectToCompanies: !this.state.redirectToCompanies
                } )
            } else if ( this.state.employerName && this.state.dropDownValue === "Interviews" ) {
                this.setState( {
                    redirectToInterviews: !this.state.redirectToInterviews
                } )
            } else if ( this.state.employerName && this.state.dropDownValue === "Salaries" ) {
                this.setState( {
                    redirectToSalaries: !this.state.redirectToSalaries
                } )
            }
        }
    }

    employerNameChange = ( e ) => {
        console.log( e )
        if ( e.length > 0 ) {
            if ( e[ 0 ].label !== undefined && e[ 0 ].id !== undefined ) {
                this.setState( {
                    employerName: e[ 0 ].label,
                    employerID: e[ 0 ].id
                } )
            }
        }
    }

    signOut = ( e ) => {
        e.preventDefault()
        localStorage.removeItem( "email" )
        localStorage.removeItem( "token" )
        localStorage.removeItem( "name" )
        localStorage.removeItem( "id" )
        localStorage.removeItem( "active" )
        window.location.assign( '/login' )
    }

    render () {
        let redirect = null
        if ( this.state.redirectToJobs ) {
            this.setState( {
                searchTerm: "",
                location: "",
                redirectToJobs: false,
                dropDownValue: "Jobs"
            } )
            redirect = <Redirect to={ {
                pathname: "/students/jobs",
                state: { searchTerm: this.state.searchTerm }
            } } />
        }
        else if ( this.state.redirectToCompanies ) {
            this.setState( {
                searchTerm: "",
                location: "",
                redirectToCompanies: false
            } )
            if ( localStorage.getItem( "active" ) === "admin" ) {
                redirect = <Redirect to={ {
                    pathname: "/admin/companies",
                    state: {
                        searchTerm: this.state.employerName,
                        active: localStorage.getItem( "active" )
                    }
                } } />
            } else if ( localStorage.getItem( "active" ) === "students" ) {
                redirect = <Redirect to={ {
                    pathname: "/students/companies",
                    state: {
                        searchTerm: this.state.employerName,
                        active: localStorage.getItem( "active" )
                    }
                } } />
            }
        } else if ( this.state.redirectToInterviews ) {
            this.setState( {
                searchTerm: "",
                location: "",
                redirectToInterviews: false
            } )
            if ( localStorage.getItem( "active" ) === "students" ) {
                redirect = <Redirect to={ {
                    pathname: "/employer/interviews",
                    state: {
                        employerName: this.state.employerName,
                        employerID: this.state.employerID
                    }
                } } />
            }
        } else if ( this.state.redirectToSalaries ) {
            this.setState( {
                searchTerm: "",
                location: "",
                redirectToSalaries: false
            } )
            if ( localStorage.getItem( "active" ) === "students" ) {
                redirect = <Redirect to={ {
                    pathname: "/employer/salaries",
                    state: {
                        employerName: this.state.searchTerm,
                        employerID: this.state.employerID
                    }
                } } />
            }
        }
        let options = []
        if ( this.state.employers ) {
            this.state.employers.forEach( employer => {
                options.push( { id: employer._id, label: employer.name } )
            } );
            // options = this.state.employers.map( employer => { return { id: employer.ceoname, value: employer.name } } )
        }
        return (
            <div className="navbar-container-wrapper">
                { redirect }
                <div className="manual-container">
                    <nav className="navbar navbar-expand-lg">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        { localStorage.getItem( "active" ) === "students" ?
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                                <Link className="navbar-brand" to="/studentdashboard">
                                    <img src={ Glassdoor_logo } className="logo-image" alt="glassdoor-logo" />
                                </Link>
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item navbar-search-wrapper">
                                        <svg viewBox="0 0 15 15" fill="none" className="navbar-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z" stroke="#056b27"></path></svg>
                                        { this.state.dropDownValue === "Jobs" ?
                                            <input type="text" name="searchTerm" className="form-control navbar-search" onChange={ this.onChange } value={ this.state.searchTerm } placeholder="Job Title, Keywords, or Company" />
                                            :

                                            <Typeahead id="employerName" name="employerName" options={ options } paginate={ false } placeholder="Select Employer..." onChange={ this.employerNameChange } />
                                        }
                                    </li>
                                    <li className="navbar-item">
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle navbar-dropdown-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                { this.state.dropDownValue }
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="Jobs">Jobs</button>
                                                <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="Companies">Companies</button>
                                                <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="Salaries">Salaries</button>
                                                <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="Interviews">Interviews</button>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item navbar-search-location">
                                        <input type="text" name="location" className="form-control" onChange={ this.onChange } placeholder="Location" />
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="green-button" onClick={ this.searchJobs }>Search</button>
                                    </li>
                                    <li className="nav-item">
                                        <div className="notification-icon">
                                            <svg version="1.1" style={ { "width": "36px", "height": "36px" } } xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="24" height="24" viewBox="0 0 24 24">
                                                <path className="normal-notification-icon" d="M17.61 6H6.39a1 1 0 00-.94.65L3 11h3.28a1 1 0 011 .68v.06l.15.45.57 1.72a.13.13 0 00.12.09h7.82a.13.13 0 00.12-.09l.74-2.23a1 1 0 01.95-.68H21l-2.45-4.35a1 1 0 00-.94-.65zM3 17a1 1 0 001 1h16a1 1 0 001-1v-5h-3.21a.1.1 0 00-.09.07l-.7 2.25a1 1 0 01-1 .68H8a1 1 0 01-1-.69l-.7-2.24a.1.1 0 00-.09-.07H3zm19 0a2 2 0 01-2 2H4a2 2 0 01-2-2v-6l2.51-4.7A2 2 0 016.39 5h11.22a2 2 0 011.88 1.3L22 11z" fill="currentColor" fillRule="evenodd"></path>
                                                <path className="notification-icon-hover" d="M17.61 6H6.39a1 1 0 00-.94.65L3 11h3.21a1.1 1.1 0 011 .75L8 14h8l.75-2.25a1.1 1.1 0 011-.75H21l-2.45-4.35a1 1 0 00-.94-.65zm0-1a2 2 0 011.88 1.3L22 11v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6l2.51-4.7A2 2 0 016.39 5z" fill="currentColor" fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="user-icon-wrapper">
                                            <div className="user-icon">
                                                <svg style={ { "width": "36px", "height": "36px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path className="normal-user-icon" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 19a8.91 8.91 0 01-5.33-1.75 6 6 0 0110.66 0A8.91 8.91 0 0112 21zm6.11-2.4a7 7 0 00-12.22 0 9 9 0 1112.22 0zM12 6a4 4 0 104 4 4 4 0 00-4-4zm0 7a3 3 0 113-3 3 3 0 01-3 3z" fill="currentColor" fillRule="evenodd"></path>
                                                    <path className="user-icon-hover" d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z" fill="currentColor" fillRule="evenodd"></path>
                                                </svg>
                                                <div className="user-icon-dropdown" >
                                                    <Link to="/students/profile" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Profile">Profile</button></Link>
                                                    <Link to={ { pathname: "/students/profile", section: "resumes" } } style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Resumes">Resumes</button></Link>
                                                    <Link to={ { pathname: "/students/profile", section: "job-preference" } } style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Job Preferences">Job Preferences</button></Link>
                                                    <Link to={ { pathname: "/students/profile", section: "demographics" } } style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Demographics">Demographics</button></Link>
                                                    <Link to={ { pathname: "/students/contributions" } } style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Contributions">Contributions</button></Link>
                                                    <Link to={ { pathname: "/students/applications", purpose: "jobApplications" } } style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="My Jobs">My Jobs</button></Link>
                                                    <button className="dropdown-item sign-out" type="button" onClick={ this.signOut } value="Sign Out">Sign Out</button>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                            :
                            localStorage.getItem( "active" ) === "admin" ?
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                                    <Link className="navbar-brand" to="/admin/dashboard">
                                        <img src={ Glassdoor_logo } className="logo-image" alt="glassdoor-logo" />
                                    </Link>
                                    {/* <Link className="navbar-brand" to="/admin/photos">
                                        <img src={ Glassdoor_logo } className="logo-image" alt="glassdoor-logo" />
                                    </Link>
                                    <Link className="navbar-brand" to="/admin/reviews">
                                        <img src={ Glassdoor_logo } className="logo-image" alt="glassdoor-logo" />
                                    </Link> */}
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li className="nav-item navbar-search-wrapper">
                                            <svg viewBox="0 0 15 15" fill="none" className="navbar-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z" stroke="#056b27"></path></svg>
                                            <Typeahead id="employerName" name="employerName" options={ options } paginate={ false } placeholder="Select Employer..." onChange={ this.employerNameChange } />
                                        </li>
                                        <li className="navbar-item">
                                            <div className="dropdown">
                                                <button className="btn dropdown-toggle navbar-dropdown-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    { this.state.dropDownValue }
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <button className="dropdown-item" type="button" onClick={ this.dropDownClick } value="Companies">Companies</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <button type="button" className="green-button" onClick={ this.searchJobs }>Search</button>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                        <li className="nav-item">
                                            <div className="user-icon-wrapper">
                                                <div className="user-icon">
                                                    <svg style={ { "width": "36px", "height": "36px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path className="normal-user-icon" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 19a8.91 8.91 0 01-5.33-1.75 6 6 0 0110.66 0A8.91 8.91 0 0112 21zm6.11-2.4a7 7 0 00-12.22 0 9 9 0 1112.22 0zM12 6a4 4 0 104 4 4 4 0 00-4-4zm0 7a3 3 0 113-3 3 3 0 01-3 3z" fill="currentColor" fillRule="evenodd"></path>
                                                        <path className="user-icon-hover" d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z" fill="currentColor" fillRule="evenodd"></path>
                                                    </svg>
                                                    <div className="user-icon-dropdown" >
                                                        <Link to="/admin/companies" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="All Companies">All Companies</button></Link>
                                                        <Link to="/admin/photos" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Photos">Photos</button></Link>
                                                        <Link to="/admin/reviews" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Photos">Reviews</button></Link>
                                                        <button className="dropdown-item sign-out" type="button" onClick={ this.signOut } value="Sign Out">Sign Out</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                                    <Link className="navbar-brand" to="/login">
                                        <img src={ Glassdoor_logo } className="logo-image" alt="glassdoor-logo" />
                                    </Link>
                                </div>
                        }
                        { localStorage.getItem( "active" ) === "employers" ?

                            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={ { marginLeft: "70%" } }>
                                    <li className="nav-item">
                                        <div className="notification-icon">
                                            <svg version="1.1" style={ { "width": "36px", "height": "36px" } } xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="24" height="24" viewBox="0 0 24 24">
                                                <path className="normal-notification-icon" d="M17.61 6H6.39a1 1 0 00-.94.65L3 11h3.28a1 1 0 011 .68v.06l.15.45.57 1.72a.13.13 0 00.12.09h7.82a.13.13 0 00.12-.09l.74-2.23a1 1 0 01.95-.68H21l-2.45-4.35a1 1 0 00-.94-.65zM3 17a1 1 0 001 1h16a1 1 0 001-1v-5h-3.21a.1.1 0 00-.09.07l-.7 2.25a1 1 0 01-1 .68H8a1 1 0 01-1-.69l-.7-2.24a.1.1 0 00-.09-.07H3zm19 0a2 2 0 01-2 2H4a2 2 0 01-2-2v-6l2.51-4.7A2 2 0 016.39 5h11.22a2 2 0 011.88 1.3L22 11z" fill="currentColor" fillRule="evenodd"></path>
                                                <path className="notification-icon-hover" d="M17.61 6H6.39a1 1 0 00-.94.65L3 11h3.21a1.1 1.1 0 011 .75L8 14h8l.75-2.25a1.1 1.1 0 011-.75H21l-2.45-4.35a1 1 0 00-.94-.65zm0-1a2 2 0 011.88 1.3L22 11v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6l2.51-4.7A2 2 0 016.39 5z" fill="currentColor" fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="user-icon-wrapper">
                                            <div className="user-icon">
                                                <svg style={ { "width": "36px", "height": "36px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path className="normal-user-icon" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 19a8.91 8.91 0 01-5.33-1.75 6 6 0 0110.66 0A8.91 8.91 0 0112 21zm6.11-2.4a7 7 0 00-12.22 0 9 9 0 1112.22 0zM12 6a4 4 0 104 4 4 4 0 00-4-4zm0 7a3 3 0 113-3 3 3 0 01-3 3z" fill="currentColor" fillRule="evenodd"></path>
                                                    <path className="user-icon-hover" d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z" fill="currentColor" fillRule="evenodd"></path>
                                                </svg>
                                                <div className="user-icon-dropdown" >
                                                    <Link to="/employer/profile" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Profile">Profile</button></Link>
                                                    <Link to="/employer/reviews" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Profile">Reviews</button></Link>
                                                    <Link to="/employer/jobs" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Profile">Jobs</button></Link>
                                                    <Link to="/employer/salaries" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Profile">Salaries</button></Link>
                                                    <Link to="/employer/interviews" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Profile">Interviews</button></Link>
                                                    <Link to="/employer/photos" style={ { textDecoration: 'none' } }><button className="dropdown-item" type="button" value="Profile">Photos</button></Link>
                                                    <button className="dropdown-item sign-out" type="button" onClick={ this.signOut } value="Sign Out">Sign Out</button>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                            :
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                            </div>
                        }

                    </nav>
                </div>
            </div>
        )
    }
}

export default withRouter( Navbar );
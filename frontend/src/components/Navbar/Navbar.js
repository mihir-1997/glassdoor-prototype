import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import Glassdoor_logo from '../../Images/glassdoor-logo.svg'
import './Navbar.css'

class Navbar extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            dropDownValue: "Jobs"
        }
    }

    dropDownClick = ( e ) => {
        e.preventDefault()
        this.setState( {
            dropDownValue: e.target.value
        } )
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
        return (
            <div className="navbar-container-wrapper">
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
                                        <input type="text" className="form-control navbar-search" name="search" onChange={ this.onChange } placeholder="Job Title, Keywords, or Company" />
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
                                        <input type="text" className="form-control" name="search" onChange={ this.onChange } placeholder="Location" />
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="green-button">Search</button>
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
                        
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={{marginLeft:"70%"}}>
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

export default Navbar;
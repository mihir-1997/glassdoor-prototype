import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import './Dashboard.css'
import SEO from '../../SEO/SEO'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import DonutChart from '../../Charts/Donutchart/Donutchart'

class Dashboard extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            name: "",
            city: "",
            profilePicture: "",
            updateProfileButton: false,
        }
    }

    componentDidMount () {
        SEO( {
            title: "Glassdoor Job Search | Find The Job That Fits Your Life"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/students/getUser/" + id )
                .then( ( res ) => {
                    console.log( res )
                    if ( res.status === 200 ) {
                        this.setState( {
                            name: res.data.name,
                            city: res.data.city,
                            profilePicture: res.data.profilePicture
                        } )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( "Error! No user" )
                            this.setState( { "error": "No user found" } )
                        } else if ( err.response.status === 401 ) {
                            this.setState( { "error": "Wrong Password" } )
                        } else if ( err.response.status === 400 ) {
                            this.setState( { "error": "Each field is required" } )
                        }
                    }
                } )
        } else {
            console.log( "No ID found in localstorage" )
        }
    }

    updateProfile = ( e ) => {
        e.preventDefault()
        this.setState( {
            updateProfileButton: !this.state.updateProfileButton
        } )
    }

    render () {
        let redirectVar = null
        if ( localStorage.getItem( "active" ) !== "students" ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        let redirectToProfile = null
        if ( this.state.updateProfileButton ) {
            redirectToProfile = <Redirect to="/students/profile" />
        }
        const data01 = [
            {
                "name": "Positive",
                "value": 61
            },
            {
                "name": "Neutral",
                "value": 23
            },
            {
                "name": "Negative",
                "value": 16
            },
        ];
        const colors = [
            "#94DA66",
            "#194383",
            "#0CA941"
        ]
        return (
            <div className="userdashboard-wrapper">
                {redirectVar }
                { redirectToProfile }
                <div className="userdashboard-first-row">
                    <div className="dashboard-tagline">
                        <h3>Hello, what would you like to explore today?</h3>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <div className="row">
                                <div className="col-3">
                                    <div className="jobs-icon second-row-buttons">
                                        <svg style={ { "width": "48px", "height": "48px" } } xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                            <g fill="none" fillRule="evenodd">
                                                <path fill="#DFF7E7" d="M10 29h4.465a1 1 0 01.832.445l1.11 1.664A2 2 0 0018.07 32h11.86a2 2 0 001.664-.89l1.11-1.665a1 1 0 01.831-.445H38v7H10v-7z"></path>
                                                <path fill="#0CAA41" d="M11 32v3a1 1 0 001 1h24a1 1 0 001-1v-3a1 1 0 012 0v4a2 2 0 01-2 2H11a2 2 0 01-2-2v-4a1 1 0 012 0zm5-18v-2a2 2 0 012-2h12a2 2 0 012 2v2h7a2 2 0 012 2v11a2 2 0 01-2 2h-5.465a1 1 0 00-.832.445l-1.11 1.664A2 2 0 0129.93 32H18.07a2 2 0 01-1.664-.89l-1.11-1.665a1 1 0 00-.831-.445H9a2 2 0 01-2-2V16a2 2 0 012-2h7zm2 0h12v-1a1 1 0 00-1-1H19a1 1 0 00-1 1v1zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h5.465a1 1 0 01.832.445l1.406 2.11a1 1 0 00.832.445h10.93a1 1 0 00.832-.445l1.406-2.11a1 1 0 01.832-.445H38a1 1 0 001-1v-9a1 1 0 00-1-1H10zm11 10h6a1 1 0 010 2h-6a1 1 0 010-2z"></path>
                                            </g>
                                        </svg>&nbsp;&nbsp;
                                    <span className="dashboard-font">Jobs</span>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="companies-icon second-row-buttons">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                            <g fill="none" fillRule="evenodd">
                                                <path fill="#0CAA41" fillRule="nonzero" d="M19.182 10h19.636c1.205 0 2.182.895 2.182 2v27H17V12c0-1.105.977-2 2.182-2zM39 37V13a1 1 0 00-1-1H20a1 1 0 00-1 1v24h20z"></path>
                                                <path fill="#DFF7E7" fillRule="nonzero" d="M22 14h14a1 1 0 011 1v20h-4v-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v3h-4V15a1 1 0 011-1z"></path>
                                                <path fill="#0CAA41" fillRule="nonzero" d="M16 19v2h-6a1 1 0 00-1 1v15h7v2H7V21c0-1.105.728-2 1.625-2H16z"></path>
                                                <rect width="4" height="4" x="23" y="16" fill="#0CAA41" rx="2"></rect><rect width="4" height="4" x="23" y="21" fill="#0CAA41" rx="2"></rect>
                                                <rect width="4" height="4" x="31" y="16" fill="#0CAA41" rx="2"></rect><rect width="4" height="4" x="31" y="21" fill="#0CAA41" rx="2"></rect>
                                                <path fill="#0CAA41" stroke="#0CAA41" strokeWidth="2" d="M27 38h4v-6a1 1 0 00-1-1h-2a1 1 0 00-1 1v6z"></path>
                                            </g>
                                        </svg>&nbsp;&nbsp;
                                    <span className="dashboard-font">Companies</span>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="salaries-icon second-row-buttons">
                                        <svg style={ { "width": "48px", "height": "48px" } } xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                            <g fill="none" fillRule="evenodd">
                                                <path fill="#0CAA41" d="M12 36h24a2 2 0 01-2 2H14a2 2 0 01-2-2zm-2-4h28a2 2 0 01-2 2H12a2 2 0 01-2-2zM9 10h30a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V12a2 2 0 012-2zm5 2a5 5 0 01-5 5v6a5 5 0 015 5h20a5 5 0 015-5v-6a5 5 0 01-5-5H14zm10 12a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"></path>
                                                <path fill="#DFF7E7" d="M15.71 14h16.58A7.015 7.015 0 0037 18.71v2.58A7.015 7.015 0 0032.29 26H15.71A7.015 7.015 0 0011 21.29v-2.58A7.015 7.015 0 0015.71 14zM24 24a4 4 0 100-8 4 4 0 000 8z"></path>
                                            </g>
                                        </svg>&nbsp;&nbsp;
                                    <span className="dashboard-font">Salaries</span>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="interviews-icon second-row-buttons">
                                        <svg style={ { "width": "48px", "height": "48px" } } xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                            <g fill="none" fillRule="evenodd">
                                                <path fill="#0CAA41" fillRule="nonzero" d="M10 22c0 .295.011.588.033.879C8.755 24.165 8 25.779 8 27.5c0 2.192 1.218 4.267 3.35 5.704l.741.5.122.885c.053.386.089.772.107 1.158.398-.226.765-.457 1.1-.693l.717-.505.859.186c.808.175 1.648.265 2.504.265.853 0 1.676-.089 2.458-.254 1.076.404 2.214.719 3.398.932C21.64 36.518 19.639 37 17.5 37c-1.012 0-1.993-.108-2.928-.31-1.206.849-2.73 1.62-4.572 2.31.345-1.38.422-2.758.232-4.137C7.649 33.12 6 30.469 6 27.5c0-2.934 1.61-5.557 4.14-7.3-.093.59-.14 1.19-.14 1.8z"></path>
                                                <path fill="#FFF" stroke="#0CAA41" strokeWidth="2" d="M32.714 37.39a11.828 11.828 0 01.309-3.935l.124-.5.479-.19C38.73 30.748 42 26.586 42 22c0-6.576-6.675-12-15-12s-15 5.424-15 12 6.675 12 14.991 12l.327-.003.667-.016.309.364c.946 1.115 2.418 2.134 4.42 3.044z"></path>
                                                <ellipse cx="27" cy="22" fill="#DFF7E7" rx="12" ry="9"></ellipse>
                                                <circle cx="21" cy="22" r="2" fill="#0CAA41"></circle>
                                                <circle cx="27" cy="22" r="2" fill="#0CAA41"></circle>
                                                <circle cx="33" cy="22" r="2" fill="#0CAA41"></circle>
                                            </g>
                                        </svg>&nbsp;&nbsp;
                                    <span className="dashboard-font">Interviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5"></div>
                    </div>
                </div>
                <div className="userdashboard-second-row">
                    <div className="row">
                        <div className="col-4 userdashboard-userinfo-wrapper">
                            <div className="userdashboard-userinfo">
                                <div className="row">
                                    <div className="col-10">
                                        <div className="userinfo-profile-picture">
                                            { this.state.profilePicture ?
                                                <img className="dashboard-profile" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.profilePicture } alt="profile"></img>
                                                :
                                                <svg className="dashboard-profile" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                                    <g fill="none" fillRule="evenodd">
                                                        <path d="M0 0h48v48H0z"></path>
                                                        <g fill="#C4C7CC" transform="translate(3.5 3.21)">
                                                            <path id="prefix__avatar-a" d="M20.5 40.79c-11.046 0-20-8.954-20-20 0-11.045 8.954-20 20-20s20 8.955 20 20c0 11.046-8.954 20-20 20z"></path>
                                                        </g>
                                                        <path fill="#FFF" fillRule="nonzero" d="M36.71 38.123A18.93 18.93 0 0124 43a18.93 18.93 0 01-12.71-4.877C13.51 33.327 18.367 30 24 30c5.633 0 10.489 3.327 12.71 8.123zM24 28a8 8 0 110-16 8 8 0 010 16z"></path>
                                                    </g>
                                                </svg>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="5 4 30 35">
                                            <g fill="none" fillRule="evenodd">
                                                <path fill="#FFF" stroke="#F5C131" strokeLinejoin="square" strokeWidth="3" d="M10 7.5A1.5 1.5 0 008.5 9v19.397a1.5 1.5 0 00.72 1.281l10 6.09a1.5 1.5 0 001.56 0l10-6.09a1.5 1.5 0 00.72-1.281V9A1.5 1.5 0 0030 7.5H10z"></path>
                                                <path stroke="#fff" d="M10 5.5h20A3.5 3.5 0 0133.5 9v19.397a3.5 3.5 0 01-1.68 2.99l-10 6.09a3.5 3.5 0 01-3.64 0l-10-6.09a3.5 3.5 0 01-1.68-2.99V9A3.5 3.5 0 0110 5.5z"></path>
                                                <path fill="#F5C131" d="M19.036 21.667h-4.783c-.692 0-.934-.458-.54-1.025l6.698-9.617c.394-.566.636-.462.542.212l-.989 7.096h4.783c.692 0 .934.458.54 1.025l-6.698 9.617c-.394.566-.636.462-.542-.212l.989-7.096z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="userinfo-name">
                                    { this.state.name }
                                </div>
                                <div className="userinfo-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M16 4H8a1 1 0 00-1 1v1h10V5a1 1 0 00-1-1zm-1.5 10a.5.5 0 01.09 1H9.5a.5.5 0 010-1zM20 7H4a1 1 0 00-1 1v6a1 1 0 001 1h3.28l.5 2h8.44l.5-2H20a1 1 0 001-1V8a1 1 0 00-1-1zM6.5 16H4v3a1 1 0 001 1h14a1 1 0 001-1v-3h-2.5l-.5 2H7zM16 3a2 2 0 012 2v1h2a2 2 0 012 2v6a2 2 0 01-1 1.73V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-3.27A2 2 0 012 14V8a2 2 0 012-2h2V5a2 2 0 012-2z" fill="#20262E" fillRule="evenodd"></path>
                                    </svg> &nbsp;
                                    {/* {this.state.user_title} */ }
                                    Student
                                </div>
                                <div className="userinfo-location">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M19 10a7 7 0 00-14 0c0 3.484 2.298 7.071 7 10.741 4.702-3.67 7-7.257 7-10.741zm-7 12c-5.333-4-8-8-8-12a8 8 0 1116 0c0 4-2.667 8-8 12zm0-10a2 2 0 110-4 2 2 0 010 4zm0 1a3 3 0 100-6 3 3 0 000 6z" fill="#20262E" fillRule="evenodd"></path>
                                    </svg> &nbsp;
                                    { this.state.city }
                                </div>
                                <div className="userinfo-update-button">
                                    <button type="button" className="btn update-profile" onClick={ this.updateProfile }>Update Your Profile</button>
                                </div>
                            </div >
                        </div >
                        <div className="col-8">
                            {/* <DonutChart data={ data01 } colors={ colors } /> */ }
                        </div>
                    </div >
                </div >
            </div >
        )
    }
}

export default Dashboard;
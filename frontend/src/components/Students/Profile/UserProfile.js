import React, { Component } from 'react'

import './UserProfile.css'
import SEO from '../../SEO/SEO'
import BasicInfo from './MainProfile/BasicInfo'
import Resume from './Resume/Resume'
import JobPreference from './Job Preference/JobPreference'
import Demographics from './Demographics/Demographics'

class UserProfile extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            selectedSection: "profile"
        }
    }

    componentDidMount () {
        SEO( {
            title: "User Profile | Glassdoor"
        } )
        if ( this.props ) {
            if ( this.props.location.section ) {
                if ( this.props.location.section === "resumes" ) {
                    this.selectSection( "resumes" )
                }
            }
        }
    }

    selectSection = ( option ) => {
        let previousSelected = document.getElementById( this.state.selectedSection )
        previousSelected.classList.remove( "sections-each-link-active" )
        this.setState( {
            selectedSection: option
        } )
        let activeSelection = document.getElementById( option )
        activeSelection.classList.add( "sections-each-link-active" )
    }

    render () {
        let activeSection = null
        if ( this.state.selectedSection === "profile" ) {
            activeSection = <BasicInfo />
        } else if ( this.state.selectedSection === "resumes" ) {
            activeSection = <Resume />
        } else if ( this.state.selectedSection === "job-preference" ) {
            activeSection = <JobPreference />
        } else if ( this.state.selectedSection === "demographics" ) {
            activeSection = <Demographics />
        }
        return (
            <div className="userprofile-wrapper">
                <div className="row">
                    <div className="col-4">
                        <div className="userinfo-profile-picture">
                            {/* <img className="userinfo-profile" src="" alt="profile"></img> */ }
                            <svg className="userinfo-profile" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                <g fill="none" fillRule="evenodd">
                                    <path d="M0 0h48v48H0z"></path>
                                    <g fill="#C4C7CC" transform="translate(3.5 3.21)">
                                        <path id="prefix__avatar-a" d="M20.5 40.79c-11.046 0-20-8.954-20-20 0-11.045 8.954-20 20-20s20 8.955 20 20c0 11.046-8.954 20-20 20z"></path>
                                    </g>
                                    <path fill="#FFF" fillRule="nonzero" d="M36.71 38.123A18.93 18.93 0 0124 43a18.93 18.93 0 01-12.71-4.877C13.51 33.327 18.367 30 24 30c5.633 0 10.489 3.327 12.71 8.123zM24 28a8 8 0 110-16 8 8 0 010 16z"></path>
                                </g>
                            </svg>
                            <svg className="userinfo-profile-icon" style={ { "width": "24px", "height": "24px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 24">
                                <g fill="none" fillRule="evenodd">
                                    <g strokeWidth="2">
                                        <path stroke="#0CAA41" d="M16.2 3H3.8a.797.797 0 00-.8.8v12.248a.8.8 0 00.38.68l7.04 3.836 6.2-3.835a.8.8 0 00.38-.68V3.8a.797.797 0 00-.8-.8z" strokeLinejoin="square" fill="#FFF"></path>
                                        <path stroke="#FFF" d="M16.2 1H3.8c-.773 0-1.473.313-1.98.82A2.791 2.791 0 001 3.8v12.248a2.8 2.8 0 001.327 2.382l6.2 3.835a2.798 2.798 0 002.946 0l6.2-3.835A2.8 2.8 0 0019 16.048V3.8c0-.773-.313-1.473-.82-1.98A2.791 2.791 0 0016.2 1z"></path>
                                    </g>
                                    <path d="M10.982 5.463L10.303 10h3.121c.556 0 .738.363.411.805l-4.372 5.91c-.328.445-.528.357-.448-.178L9.694 12h-3.12c-.556 0-.739-.363-.412-.805l4.372-5.91c.329-.445.528-.357.448.178z" fill="#0CAA41"></path>
                                </g>
                            </svg> &nbsp;&nbsp;
                            <span className="add-photo">Add a photo</span>
                        </div>
                        <div className="userinfo-sections-links">
                            <div className="userinfo-profile sections-each-link sections-each-link-active" id="profile" onClick={ () => this.selectSection( "profile" ) }>
                                <span className="sections-each-link-text">Profile</span>
                            </div>
                            <div className="userinfo-profile sections-each-link" id="resumes" onClick={ () => this.selectSection( "resumes" ) }>
                                <span className="sections-each-link-text">Resumes</span>
                            </div>
                            <div className="userinfo-profile sections-each-link" id="job-preference" onClick={ () => this.selectSection( "job-preference" ) }>
                                <span className="sections-each-link-text">Job Preference</span>
                            </div>
                            <div className="userinfo-profile sections-each-link" id="demographics" onClick={ () => this.selectSection( "demographics" ) }>
                                <span className="sections-each-link-text">Demographics</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        { activeSection }
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;
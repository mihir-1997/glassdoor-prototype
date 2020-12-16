import React, { Component } from 'react'
import axios from 'axios'

import intel1 from '../../../Images/intel1.jpg'
import JobApplication from './JobApplication'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class JobDescription extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            ...this.props.job,
            applicationStatus: "",
            applicationID: ""
        }
    }

    componentDidMount () {
        if ( this.props.job ) {
            if ( this.props.job.applicants ) {
                let userApplicationStatus = this.state.applicants.find( applicant => applicant.studentID === localStorage.getItem( "id" ) )
                if ( userApplicationStatus ) {
                    this.setState( {
                        applicationStatus: userApplicationStatus.status,
                        applicationID: userApplicationStatus._id
                    } )
                }
            }
        }
    }

    applyForJob = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "job-application-popup-" + this.state._id )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    applyToJob = () => {
        // this.componentDidMount()
        window.location.reload()
    }

    withdrawApplication = () => {
        let id = localStorage.getItem( "id" )
        if ( id && this.state.applicationID ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/withdrawApplication/" + this.state.applicationID )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        window.location.reload()
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
    }

    render () {
        return (
            <div className="job-description">
                <div className="compnay-image">
                    <img className="company-image" src={ intel1 } alt="company" />
                </div>
                <div className="job-description-company">
                    <div className="row">
                        <div className="company-left-pane col-8">
                            <div className="company-name-ratings">
                                { this.state.employerName } &nbsp;
                            <span className="job-description-ratings">
                                    { this.state.avgRatings ?
                                        <span>
                                            { this.state.avgRatings }
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                                <path fill="#0CA941" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                                            </svg>
                                        </span>
                                        : null }
                                </span>
                            </div>
                            <div className="company-title">
                                { this.state.title }
                            </div>
                            <div className="each-job-location">
                                { this.state.city }
                            </div>
                            <div className="each-job-salary">
                                { this.state.salary ?
                                    <span>${ this.state.salary }</span>
                                    : null }
                            </div>
                        </div>
                        <div className="company-right-pane col-4">
                            { this.state.applicationStatus ?
                                <span>
                                    <button type="button" className="btn reverse-update-proflie" disabled={ true }>{ this.state.applicationStatus }</button>
                                    { this.state.applicationStatus === "Submitted" ?
                                        <button type="button" className="btn reverse-update-proflie" onClick={ this.withdrawApplication }>Withdraw</button>
                                        :
                                        null }
                                </span>
                                : <button type="button" className="btn reverse-update-proflie" onClick={ this.applyForJob }>Apply Now</button>
                            }

                        </div>
                    </div>
                </div>
                <div className="job-description-text-wrapper">
                    { this.state.description ?
                        <span>
                            <div className="job-description-heading">
                                Job Description
                    </div>
                            <div className="job-description-text">
                                { this.state.description }
                            </div>
                        </span>
                        : null }
                    { this.state.qualifications ?
                        <span>
                            <div className="job-description-heading">
                                Qualifications
                            </div>
                            <div className="job-description-text">
                                { this.state.qualifications }
                            </div>
                        </span>
                        : null }
                    { this.state.responsibilities ?
                        <span>
                            <div className="job-description-heading">
                                Responsibilities
                            </div>
                            <div className="job-description-text">
                                { this.state.responsibilities }
                            </div>
                        </span>
                        : null }
                </div>
                <JobApplication key={ Math.random() } employerName={ this.state.employerName } jobId={ this.state._id } applyToJob={ this.applyToJob } />
            </div>
        )
    }
}

export default JobDescription;
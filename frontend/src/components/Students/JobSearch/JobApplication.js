import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'

import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class JobApplication extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            jobId: this.props.jobId,
            firstName: "",
            lastName: "",
            resumes: [],
            selectedResumeID: "",
            selectedResumeName: "",
            coverletter: "",
            employerName: this.props.employerName,
            error: ""
        }
    }

    componentDidMount () {
        SEO( {
            title: "Jobs"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/students/getUser/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        let primary = res.data.resume.filter( resume => resume.isPrimary === true )
                        console.log( primary )
                        this.setState( {
                            resumes: res.data.resume,
                            selectedResumeID: primary[ 0 ].resumeID,
                            selectedResumeName: primary[ 0 ].resumeName
                        } )
                    }
                } )
                .catch( ( err ) => {
                    console.log( err )
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

    onChange = ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    onResumeChange = ( e ) => {
        this.setState( {
            selectedResumeID: e.target.value.split( "-/-" )[ 0 ],
            selectedResumeName: e.target.value.split( "-/-" )[ 1 ]
        } )
    }

    changeCoverLetter = ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.files[ 0 ]
        } )
    }

    closePopup = () => {
        if ( $( `#${ "job-application-popup-" + this.state.jobId }` ).length > 0 ) {
            if ( $( `#${ "job-application-popup-" + this.state.jobId }` ).attr( 'class' ).split( " " ).length === 1 ) {
                console.log( "inside both if" )
                $( `#${ "job-application-popup-" + this.state.jobId }` ).remove()
            }
        }
        let popup = document.getElementById( "job-application-popup-" + this.state.jobId )
        popup.classList.remove( "popup-wrapper-show" )
    }

    applyToJob = () => {
        if ( this.state.firstName && this.state.lastName && this.state.selectedResumeID && this.state.selectedResumeName ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                let jobApplication = {
                    studentID: id,
                    resumeID: this.state.selectedResumeID,
                    resumeName: this.state.selectedResumeName,
                    name: this.state.firstName + " " + this.state.lastName,
                }
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/applyForJob/" + this.state.jobId, jobApplication )
                    .then( ( res ) => {
                        if ( res.status === 200 ) {
                            this.closePopup()
                            this.props.applyToJob()
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
        } else {
            this.setState( {
                error: "*Please fill all required fields"
            } )
        }
    }

    render () {
        return (
            <div>
                <div id={ "job-application-popup-" + this.state.jobId } className="popup-container">
                    <div className="popup-wrapper">
                        <Header key={ Math.random() } closePopup={ this.closePopup } headerText={ this.state.employerName } />
                        <div className="popup-body">
                            <form className="popup-form">
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentFirstName">First Name*</label>
                                        <input type="text" className="form-control" id="jobStudentFirstName" placeholder="First Name" name="firstName" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentLastName">Last Name*</label>
                                        <input type="text" className="form-control" id="jobStudentLastName" placeholder="Last Name" name="lastName" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentResume">Select Resume*</label>
                                        <select id="jobStudentResume" className="form-control" name="selectedResume" onChange={ this.onResumeChange } >
                                            <option value="">Select Resume</option>
                                            { this.state.resumes ?
                                                this.state.resumes.map( ( resume, index ) => {
                                                    let selected = null
                                                    if ( this.state.selectedResumeName === resume.resumeName ) {
                                                        selected = "selected"
                                                    }
                                                    return <option value={ resume._id + "-/-" + resume.resumeName } key={ index } selected={ selected }>{ resume.resumeName }</option>
                                                } )
                                                : null }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentCoverLetter">Select Cover Letter</label>
                                        <input type="file" className="form-control" accept="application/pdf" id="jobStudentCoverLetter" placeholder="Select Cover Letter" name="coverletter" onChange={ this.changeCoverLetter } />
                                    </div>
                                </div>
                            </form>
                            <div className="error">
                                { this.state.error }
                            </div>
                        </div>
                        <Footer key={ Math.random() } closePopup={ this.closePopup } saveChanges={ this.applyToJob } buttonName="Apply" />
                    </div>
                </div>
            </div>
        )
    }
}

export default JobApplication;
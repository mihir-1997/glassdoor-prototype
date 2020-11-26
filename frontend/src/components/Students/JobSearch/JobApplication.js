import React, { Component } from 'react'
import axios from 'axios'

import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class JobApplication extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            firstName: "",
            lastName: "",
            resumes: [],
            selectedResume: "",
            coverletter: "",
            employerName: this.props.employerName
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
                        this.setState( {
                            resumes: res.data.resume
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

    changeCoverLetter = ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.files[ 0 ]
        } )
    }

    closePopup = () => {
        let popup = document.getElementById( "job-application-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    applyToJob = () => {

    }

    render () {
        return (
            <div>
                <div id="job-application-popup" className="popup-container">
                    <div className="popup-wrapper">
                        <Header closePopup={ this.closePopup } headerText={ this.state.employerName } />
                        <div className="popup-body">
                            <form className="popup-form">
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentFirstName">First Name</label>
                                        <input type="text" className="form-control" id="jobStudentFirstName" placeholder="First Name" name="firstName" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentLastName">Last Name</label>
                                        <input type="text" className="form-control" id="jobStudentLastName" placeholder="Last Name" name="lastName" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentResume">Select Resume</label>
                                        <select id="jobStudentResume" className="form-control" name="selectedResume" onChange={ this.onChange }>
                                            <option value="">Select Resume</option>
                                            { this.state.resumes ?
                                                this.state.resumes.map( ( resume, index ) => {
                                                    return <option value={ resume.resumeName }>{ resume.resumeName }</option>
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
                        </div>
                        <Footer closePopup={ this.closePopup } saveChanges={ this.applyToJob } buttonName="Apply" />
                    </div>
                </div>
            </div>
        )
    }
}

export default JobApplication;
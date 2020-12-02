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
            selectedImageName: "",
            ethnicity: "",
            gender: "",
            disability: "",
            veteranStatus: "",
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
                        console.log( res.data )
                        this.setState( {
                            resumes: res.data.resume,
                            ethnicity: res.data.userDemographics.ethnicity,
                            gender: res.data.userDemographics.gender,
                            disability: res.data.userDemographics.disability,
                            veteranStatus: res.data.userDemographics.veteranStatus
                        }, () => {
                            let primary = res.data.resume.filter( resume => resume.isPrimary === true )
                            console.log( primary )
                            if ( primary.length > 0 ) {
                                this.setState( {
                                    selectedResumeID: primary[ 0 ].resumeID,
                                    selectedResumeName: primary[ 0 ].resumeName,
                                    selectedImageName: primary[ 0 ].imageName,
                                } )
                            }
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
            selectedResumeName: e.target.value.split( "-/-" )[ 1 ],
            selectedImageName: e.target.value.split( "-/-" )[ 2 ]
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
        if ( this.state.firstName && this.state.lastName && this.state.selectedResumeID && this.state.selectedResumeName && this.state.selectedImageName && this.state.disability && this.state.ethnicity && this.state.gender && this.state.veteranStatus ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                const formData = new FormData()
                formData.append( 'myResume', this.state.coverletter )
                formData.append( 'studentID', id )
                formData.append( 'resumeID', this.state.selectedResumeID )
                formData.append( 'resumeName', this.state.selectedResumeName )
                formData.append( 'imageName', this.state.selectedImageName )
                formData.append( 'ethnicity', this.state.ethnicity )
                formData.append( 'gender', this.state.gender )
                formData.append( 'disability', this.state.disability )
                formData.append( 'veteranStatus', this.state.veteranStatus )
                formData.append( 'name', this.state.firstName + " " + this.state.lastName )
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                // let jobApplication = {
                //     studentID: id,
                //     resumeID: this.state.selectedResumeID,
                //     resumeName: this.state.selectedResumeName,
                //     imageName: this.state.selectedImageName,
                //     ethnicity: this.state.ethnicity,
                //     gender: this.state.gender,
                //     disability: this.state.disability,
                //     veteranStatus: this.state.veteranStatus,
                //     name: this.state.firstName + " " + this.state.lastName,
                // }
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/applyForJob/" + this.state.jobId, formData, config )
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
                                                    return <option value={ resume._id + "-/-" + resume.resumeName + "-/-" + resume.imageName } key={ index } selected={ selected }>{ resume.resumeName }</option>
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
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentDisability">Disability*</label>
                                        <div className="form-control">
                                            <input type="radio" name="disability" value="Yes" onChange={ this.onChange } checked={ this.state.disability === "Yes" } />&nbsp;Yes&nbsp;&nbsp;
                                            <input type="radio" name="disability" value="No" onChange={ this.onChange } checked={ this.state.disability === "No" } />&nbsp;No&nbsp;&nbsp;
                                            <input type="radio" name="disability" value="Prefer Not to Say" onChange={ this.onChange } checked={ this.state.disability === "Prefer Not to Say" } />&nbsp;Prefer Not to Say&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentGender">Gender*</label>
                                        <div className="form-control"><input type="radio" name="gender" value="Man" onChange={ this.onChange } checked={ this.state.gender === "Man" } />&nbsp;Man&nbsp;&nbsp;</div>
                                        <div className="form-control"><input type="radio" name="gender" value="Woman" onChange={ this.onChange } checked={ this.state.gender === "Woman" } />&nbsp;Woman&nbsp;&nbsp;</div>
                                        <div className="form-control"><input type="radio" name="gender" value="Non-Binary" onChange={ this.onChange } checked={ this.state.gender === "Non-Binary" } />&nbsp;Non-Binary&nbsp;&nbsp;</div>
                                        <div className="form-control"><input type="radio" name="gender" value="Prefer to Self Describe" onChange={ this.onChange } checked={ this.state.gender === "Prefer to Self Describe" } />&nbsp;Prefer to Self Describe&nbsp;&nbsp;</div>
                                        <div className="form-control"><input type="radio" name="gender" value="Prefer Not to Say" onChange={ this.onChange } checked={ this.state.gender === "Prefer Not to Say" } />&nbsp;Prefer Not to Say&nbsp;&nbsp;</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentRace">Race*</label>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Indigenous American or Alaska Native" onChange={ this.onChange } checked={ this.state.ethnicity === "Indigenous American or Alaska Native" } />&nbsp;&nbsp;Indigenous American or Alaska Native</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="East Asian" onChange={ this.onChange } checked={ this.state.ethnicity === "East Asian" } />&nbsp;&nbsp;East Asian</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="South Asian" onChange={ this.onChange } checked={ this.state.ethnicity === "South Asian" } />&nbsp;&nbsp;South Asian</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Southeast Asian" onChange={ this.onChange } checked={ this.state.ethnicity === "Southeast Asian" } />&nbsp;&nbsp;Southeast Asian</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Native Hawaiian or Other Pacific Islander" onChange={ this.onChange } checked={ this.state.ethnicity === "ManNative Hawaiian or Other Pacific Islander" } />&nbsp;&nbsp;Native Hawaiian or Other Pacific Islander</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Middle Eastern" onChange={ this.onChange } checked={ this.state.ethnicity === "Middle Eastern" } />&nbsp;&nbsp;Middle Eastern</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Black or African American" onChange={ this.onChange } checked={ this.state.ethnicity === "Black or African American" } />&nbsp;&nbsp;Black or African American</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Hispanic or Latinx" onChange={ this.onChange } checked={ this.state.ethnicity === "Hispanic or Latinx" } />&nbsp;&nbsp;Hispanic or Latinx</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="White" onChange={ this.onChange } checked={ this.state.ethnicity === "White" } />&nbsp;&nbsp;White</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Prefer to Self Describe" onChange={ this.onChange } checked={ this.state.ethnicity === "Prefer to Self Describe" } />&nbsp;&nbsp;Prefer to Self Describe</div>
                                        <div className="form-control"><input type="radio" name="ethnicity" value="Prefer Not to Say" onChange={ this.onChange } checked={ this.state.ethnicity === "Prefer Not to Say" } />&nbsp;&nbsp;Prefer Not to Say</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentVeteran">Veteran*</label>
                                        <div className="form-control"><input type="radio" name="veteranStatus" value="Yes" onChange={ this.onChange } checked={ this.state.veteranStatus === "Yes" } />&nbsp;&nbsp;Yes</div>
                                        <div className="form-control"><input type="radio" name="veteranStatus" value="No" onChange={ this.onChange } checked={ this.state.veteranStatus === "No" } />&nbsp;&nbsp;No</div>
                                        <div className="form-control"><input type="radio" name="veteranStatus" value="Prefer Not to Say" onChange={ this.onChange } checked={ this.state.veteranStatus === "Prefer Not to Say" } />&nbsp;&nbsp;Prefer Not to Say</div>
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
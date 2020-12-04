import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './EmployerJobs.css'
import JobApplicants from './jobApplicants'
import logo from '../../../Images/linkedin-logo.png'


import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import JobApplication from '../../Students/JobSearch/JobApplication'

class IndividualJob extends Component {

    constructor( props ) {
        super( props )
    }

    convertDate = ( old ) => {
        let date = new Date( old )
        let format_date = ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear()
        return format_date;

    }
    getApplicants = ( e ) => {
        e.preventDefault();
        let popup = document.getElementById( "job-applicant-popup-" + this.props.data._id )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )

    }

    applyForJob = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "job-application-popup-" + this.props.data._id )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    applyToJob = () => {
        // this.componentDidMount()
        window.location.reload()
    }

    render () {

        return (
            <div>

                <div className="job-wrapper">

                    <img className="company-logo-job" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.props.logo } alt="logo" />

                    <div className="job">
                        <span className="employer-name">{ this.props.data.employerName }</span>


                        <span style={ { color: "#7F7F7F", fontSize: "14px", fontWeight: "normal", marginTop: "0px", marginBottom: "2px", marginLeft: "320px", display: "inline-block" } }>Posted on: { this.convertDate( this.props.data.date ) }</span>
                        <br />
                        <span className="job-title-employer"><strong>{ this.props.data.title }</strong></span>
                        <span style={ { display: "inline-block", marginLeft: "115px" } }>{ this.props.data.type }</span>
                        <span style={ { display: "inline-block", paddingLeft: "65px" } }> <span style={ { fontWeight: "bold", display: "inline-block", margin: "0px 0px 0px 0px" } }>Industry:</span> { this.props.data.industry }</span>

                        <div className="basic-job-info">
                            <span style={ { fontWeight: "bold" } }>Description</span>
                            <br />
                            <span>{ this.props.data.description }</span>
                            <br />
                            <span style={ { fontWeight: "bold" } }>Qualifications</span>
                            <br />
                            <span>{ this.props.data.qualifications }</span>
                            <br />
                            <span style={ { fontWeight: "bold" } }>Responsibilities</span>
                            <br />
                            <span>{ this.props.data.responsibilities }</span>

                        </div >
                        <div className="job-address">
                            <span style={ { fontWeight: "bold" } }>Location</span>
                            {/* <span style={ { display: "inline-block", marginLeft: "385px" } }> <span style={ { fontWeight: "bold", display: "inline-block", margin: "0px" } }>Salary : $</span>{ this.props.data.salary }</span> */ }
                            <br />
                            <span>📍 { this.props.data.address }, { this.props.data.city }, { this.props.data.state }, { this.props.data.country }, { this.props.data.zip }</span>
                            <br />
                            { this.props.isStudent ?
                                localStorage.getItem( "active" ) === "admin" ?
                                    null
                                    :
                                    this.props.data.applicants.length > 0 ?
                                        this.props.data.applicants.some( d => d.studentID === localStorage.getItem( "id" ) ) ?
                                            <button disabled={ true } className="btn btn-primary d-flex justify-content-center align-items-center" style={ { marginLeft: "210px", marginTop: "10px", height: "30px", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)" } }>Applied</button>
                                            :
                                            <span>
                                                <button onClick={ this.applyForJob } className="btn btn-primary d-flex justify-content-center align-items-center" style={ { marginLeft: "210px", marginTop: "10px", height: "30px", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)" } }>Apply</button>
                                                <JobApplication key={ Math.random() } employerName={ this.props.data.employerName } jobId={ this.props.data._id } applyToJob={ this.applyToJob } />
                                            </span>
                                        :
                                        <span>
                                            <button onClick={ this.applyForJob } className="btn btn-primary d-flex justify-content-center align-items-center" style={ { marginLeft: "210px", marginTop: "10px", height: "30px", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)" } }>Apply</button>
                                            <JobApplication key={ Math.random() } employerName={ this.props.data.employerName } jobId={ this.props.data._id } applyToJob={ this.applyToJob } />
                                        </span>
                                :
                                <span style={ { display: "inline-block" } }>
                                    <button onClick={ this.getApplicants } className="btn btn-primary d-flex justify-content-center align-items-center" style={ { marginLeft: "210px", marginTop: "10px", height: "30px", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)" } }>View Applicants</button>
                                    <JobApplicants jobId={ this.props.data._id } title={ this.props.data.title } />
                                </span>
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default IndividualJob;
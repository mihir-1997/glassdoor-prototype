import React, { Component } from 'react'
import axios from "axios";

import './EmployerJobs.css'
import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'

import IndividualApplicant from './individualApplicant'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class JobApplicants extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            applicants: [],
        }
    }
    componentDidMount () {

        let id = this.props.jobId
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getListofApplicants/" + id )
                .then( ( res ) => {
                    // console.log(res.data[0].applicants)
                    if ( res.status === 200 ) {
                        this.setState( {
                            applicants: res.data[ 0 ].applicants.filter( d => d.status !== "withdrawn" )
                        } )
                        //console.log("%%%%%%%%%" + this.state.applicants)
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( " " + err.response.message )
                        }
                    }
                } )
        }
    }

    closePopup = () => {
        console.log( "close called" )
        let popup = document.getElementById( "job-applicant-popup-" + this.props.jobId )
        popup.classList.remove( "popup-wrapper-show" )
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            newStatus: e.target.value
        } )
    }

    render () {

        let allApplicants = this.state.applicants.map( ( eachApplicant ) => {
            return (
                <IndividualApplicant
                    key={ Math.random() }
                    data={ eachApplicant }
                    closePopup={ this.closePopup }
                ></IndividualApplicant>
            );
        } )

        return (
            <div id={ "job-applicant-popup-" + this.props.jobId } className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Applicants for job : { this.props.title }
                        </div>
                        <div style={ { overflowY: "auto" } }>
                            { allApplicants }
                        </div>

                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.closePopup } />
                </div>
            </div>
        )
    }
}

export default JobApplicants;
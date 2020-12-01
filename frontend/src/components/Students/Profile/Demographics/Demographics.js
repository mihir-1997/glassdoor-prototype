import React, { Component } from 'react'
import axios from 'axios'

import './Demographics.css'
import Demographics_IMG from '../../../../Images/demographics.svg'
import AddRace from './AddRace'
import AddGender from './AddGender'
import AddDisability from './AddDisability'
import AddVeteran from './AddVeteran'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class Demographics extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            ethnicity: "",
            gender: "",
            disability: "",
            veteranStatus: "",
        }
    }

    componentDidMount () {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/students/getUser/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.setState( {
                            ethnicity: res.data.userDemographics.ethnicity,
                            gender: res.data.userDemographics.gender,
                            disability: res.data.userDemographics.disability,
                            veteranStatus: res.data.userDemographics.veteranStatus,
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
    }

    sendDemographicsUpdate = () => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            let demographics = {
                ethnicity: this.state.ethnicity,
                gender: this.state.gender,
                disability: this.state.disability,
                veteranStatus: this.state.veteranStatus,
            }
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/students/updateUserDemographics/" + id, demographics )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.componentDidMount()
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

    addRace = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "race-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveRace = ( race ) => {
        this.setState( {
            ethnicity: race
        }, () => {
            this.sendDemographicsUpdate()
        } )
    }

    addGender = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "gender-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveGender = ( gender ) => {
        this.setState( {
            gender: gender
        }, () => {
            this.sendDemographicsUpdate()
        } )
    }

    addDisability = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "disability-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveDisability = ( disability ) => {
        this.setState( {
            disability: disability
        }, () => {
            this.sendDemographicsUpdate()
        } )
    }

    addVeteran = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "veteran-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveVeteran = ( veteranStatus ) => {
        this.setState( {
            veteranStatus: veteranStatus
        }, () => {
            this.sendDemographicsUpdate()
        } )
    }

    render () {
        return (
            <div>
                <div className="demographics-wrapper">
                    <div className="demographics-title">
                        <h3>
                            Demographics
                        </h3>
                    </div>
                    <div className="demographics-text-wrapper">
                        <div className="demographics-text-title">
                            Help End Inequality
                        </div>
                        <div className="demographics-text">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        Shine a light on inequities in the workplace. Anonymously share your demographics to help pinpoint pay and diversity disparities.
                                    </div>
                                    <div>
                                        Providing your demographic information is optional and, if provided, it will not be shared with employers. This information will be collected and used in accordance with our Privacy Policy.
                                    </div>
                                </div>
                                <div className="col-6">
                                    <img className="demographics-icon" src={ Demographics_IMG } alt="demographics_svg" />
                                </div>
                            </div>
                        </div>
                        <div className="demographics-section">
                            <div className="race-ethnicity">
                                <h3 className="demographics-section-title">
                                    Race/Ethnicity
                                    <span onClick={ this.addRace } className="demographics-section-add">
                                        <svg className="basic-info-circle-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <g className="basic-info-circle-g" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#1861bf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                            <g className="basic-info-circle-g-hover" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#1861bf" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#f5f6f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                        </svg>

                                    </span>
                                </h3>
                                <div className="demographics-each-section">
                                    { this.state.ethnicity ?
                                        <span>I identify my race or ethnicity as:
                                        &nbsp;<span className="demographics-answer">{ this.state.ethnicity }</span>
                                        </span>
                                        : null
                                    }
                                </div>
                            </div>
                            <AddRace saveRace={ this.saveRace } />
                        </div>
                        <div className="demographics-section">
                            <div className="gender">
                                <h3 className="demographics-section-title">
                                    Gender
                                    <span onClick={ this.addGender } className="demographics-section-add">
                                        <svg className="basic-info-circle-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <g className="basic-info-circle-g" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#1861bf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                            <g className="basic-info-circle-g-hover" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#1861bf" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#f5f6f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                        </svg>

                                    </span>
                                </h3>
                                <div className="demographics-each-section">
                                    { this.state.gender ?
                                        <span>I identify my gender as:
                                        &nbsp;<span className="demographics-answer">{ this.state.gender }</span>
                                        </span>
                                        : null
                                    }
                                </div>
                            </div>
                            <AddGender saveGender={ this.saveGender } />
                        </div>
                        <div className="demographics-section">
                            <div className="disability">
                                <h3 className="demographics-section-title">
                                    Disability
                                    <span onClick={ this.addDisability } className="demographics-section-add">
                                        <svg className="basic-info-circle-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <g className="basic-info-circle-g" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#1861bf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                            <g className="basic-info-circle-g-hover" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#1861bf" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#f5f6f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                        </svg>

                                    </span>
                                </h3>
                                <div className="demographics-each-section">
                                    { this.state.disability ?
                                        <span>Disability:
                                        &nbsp;<span className="demographics-answer">{ this.state.disability }</span>
                                        </span>
                                        : null
                                    }
                                </div>
                            </div>
                            <AddDisability saveDisability={ this.saveDisability } />
                        </div>
                        <div className="demographics-section">
                            <div className="veteran">
                                <h3 className="demographics-section-title">
                                    Veteran Status
                                    <span onClick={ this.addVeteran } className="demographics-section-add">
                                        <svg className="basic-info-circle-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <g className="basic-info-circle-g" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#1861bf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                            <g className="basic-info-circle-g-hover" fill="none" fillRule="evenodd">
                                                <circle cx="12" cy="12" fill="#1861bf" r="12"></circle>
                                                <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#f5f6f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </g>
                                        </svg>

                                    </span>
                                </h3>
                                <div className="demographics-each-section">
                                    { this.state.veteranStatus ?
                                        <span>Veteran Status:
                                        &nbsp;<span className="demographics-answer">{ this.state.veteranStatus }</span>
                                        </span>
                                        : null
                                    }
                                </div>
                            </div>
                            <AddVeteran saveVeteran={ this.saveVeteran } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Demographics;
import React, { Component } from 'react'

import './Demographics.css'
import Demographics_IMG from '../../../../Images/demographics.svg'
import AddRace from './AddRace'
import AddGender from './AddGender'
import AddDisability from './AddDisability'
import AddVeteran from './AddVeteran'

class Demographics extends Component {

    addRace = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "race-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    addGender = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "gender-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    addDisability = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "disability-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    addVeteran = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "veteran-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
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
                                    I identify my race or ethnicity as:
                                    {/* &nbsp;<span className="demographics-answer">{this.state.race}</span> */ }
                                    &nbsp;<span className="demographics-answer">Asian</span>
                                </div>
                            </div>
                            <AddRace />
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
                                    I identify my gender as:
                                    {/* &nbsp;<span className="demographics-answer">{this.state.gender}</span> */ }
                                    &nbsp;<span className="demographics-answer">Male</span>
                                </div>
                            </div>
                            <AddGender />
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
                                    Disability:
                                    {/* &nbsp;<span className="demographics-answer">{this.state.disability}</span> */ }
                                    &nbsp;<span className="demographics-answer">No</span>
                                </div>
                            </div>
                            <AddDisability />
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
                                    Veteran Status:
                                    {/* &nbsp;<span className="demographics-answer">{this.state.veteran}</span> */ }
                                    &nbsp;<span className="demographics-answer">No</span>
                                </div>
                            </div>
                            <AddVeteran />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Demographics;
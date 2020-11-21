import React, { Component } from 'react'

import './Resume.css'
import SEO from '../../../SEO/SEO'
import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddResume extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            selectedResume: "",
            isPrimary: false,
            error: ""
        }
    }

    closePopup = () => {
        let popup = document.getElementById( "resume-popup" )
        popup.classList.remove( "popup-wrapper-show" )
        SEO( {
            title: "Manage resumes | Glassdoor"
        } )
    }

    saveResume = () => {
        this.closePopup()
        if ( this.state.selectedResume ) {
            this.props.saveResume( this.state.selectedResume, this.state.isPrimary )
        } else {
            this.setState( {
                error: "Please select a resume"
            } )
        }
    }

    uploadResume = ( e ) => {
        e.preventDefault()
        let uploadResume = document.getElementById( "resume-upload" )
        console.log( uploadResume )
        uploadResume.click()
    }

    uploadResumeInput = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedResume: e.target.files[ 0 ]
        } )
    }

    onChange = ( e ) => {
        this.setState( {
            isPrimary: !this.state.isPrimary
        } )
    }

    render () {

        return (
            <div id="resume-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Resume
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <div className="resume-upload-wrapper" onClick={ this.uploadResume }>
                                        <div className="resume-upload">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="91" height="90" viewBox="0 0 91 90">
                                                <path d="M70 71.286a1 1 0 012 0v8.572c0 5.317-5.086 9.761-10.786 9.761H10.16C4.562 89.62 0 85.257 0 79.858V17.381c0-5.4 4.562-9.762 10.16-9.762h39.789a1 1 0 110 2H10.16C5.647 9.62 2 13.106 2 17.381v62.477c0 4.274 3.647 7.761 8.16 7.761h51.054c4.651 0 8.786-3.613 8.786-7.761v-8.572zm-57-36.7h34a1 1 0 010 2H13a1 1 0 110-2zm0 12h46a1 1 0 010 2H13a1 1 0 110-2zm0 12h46a1 1 0 010 2H13a1 1 0 110-2zm0 12h46a1 1 0 010 2H13a1 1 0 110-2zm59-67.22v57.22a1 1 0 11-2 0V3.463L53.371 20.092a1 1 0 11-1.414-1.414L70.342.293a1 1 0 011.414 0l18.385 18.385a1 1 0 01-1.414 1.414L72 3.365z" fill="currentColor" fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div className="resume-upload-text">
                                            <div>
                                                Select a file to upload
                                            </div>
                                            <div className="resume-upload-bold-text">
                                                { this.state.selectedResume ?
                                                    null
                                                    : <span>Choose a file to Upload</span>
                                                }
                                            </div>
                                            <div className="resume-upload-bold-text">
                                                { this.state.selectedResume ?
                                                    this.state.selectedResume.name
                                                    : null }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="isprimary-input">
                                        <div>
                                            <input type="checkbox" name="isPrimary" onChange={ this.onChange } checked={ this.state.isPrimary } />&nbsp;Primary?
                                        </div>
                                    </div>
                                    <input type="file" name="selectedResume" id="resume-upload" accept="application/pdf" className="resume-upload-input" onChange={ this.uploadResumeInput } />
                                </div>
                            </div>
                        </form>
                        <div className="error">
                            { this.state.error }
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveResume } />
                </div>
            </div>
        )
    }
}

export default AddResume;
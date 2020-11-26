import React, { Component } from 'react'

import intel1 from '../../../Images/intel1.jpg'
import JobApplication from './JobApplication'

class JobDescription extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            ...this.props.job
        }
    }

    applyForJob = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "job-application-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
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
                                            this.state.avgRatings
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
                            <button type="button" className="btn reverse-update-proflie" onClick={ this.applyForJob }>Apply Now</button>
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
                    { this.state.description ?
                        <span>
                            <div className="job-description-heading">
                                Qualifications
                            </div>
                            <div className="job-description-text">
                                { this.state.qualifications }
                            </div>
                        </span>
                        : null }
                </div>
                <JobApplication employerName={ this.state.employerName } />
            </div>
        )
    }
}

export default JobDescription;
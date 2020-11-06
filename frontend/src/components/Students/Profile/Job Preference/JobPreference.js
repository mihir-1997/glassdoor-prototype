import React, { Component } from 'react'

import './JobPreference.css'
import SEO from '../../../SEO/SEO'
import Footer from '../../../Popup/Footer'

class JobPreference extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            relocationChecked: false
        }
    }

    componentDidMount () {
        SEO( {
            title: "Job Preferences | Glassdoor"
        } )
    }

    searchStatusChange = ( e ) => {
        console.log( e.target.value )
    }

    salaryPeriodChange = ( e ) => {
        console.log( e.target.value )
    }

    saveSalary = ( e ) => {
        e.preventDefault()
    }

    showAddTitle = ( e ) => {
        e.preventDefault()
        let addTitle = document.getElementById( "add-title-input" )
        addTitle.classList.add( "add-title-input-show" )
    }

    addJobTitle = ( e ) => {
        e.preventDefault()
        let addTitle = document.getElementById( "add-title-input" )
        addTitle.classList.remove( "add-title-input-show" )
    }

    showSalary = ( e ) => {
        e.preventDefault()
        let addSalaryDiv = document.getElementById( "salary-add-div" )
        let addSalary = document.getElementById( "salary-add-title" )
        addSalaryDiv.classList.add( "salary-add-div-show" )
        addSalary.classList.add( "job-prefer-salary-add-button-hide" )
    }

    removeJobTitle = () => {

    }

    closeSalaryPopup = ( e ) => {
        let addSalaryDiv = document.getElementById( "salary-add-div" )
        let addSalary = document.getElementById( "salary-add-title" )
        addSalaryDiv.classList.remove( "salary-add-div-show" )
        addSalary.classList.remove( "job-prefer-salary-add-button-hide" )
    }

    changeJobLocation = ( e ) => {
        e.preventDefault()
    }

    addIndustry = ( e ) => {
        e.preventDefault()

    }

    removeIndustry = () => {

    }

    render () {
        return (
            <div>
                <div className="job-prefer-wrapper">
                    <div className="job-prefer-title">
                        <h3>Job Preferences</h3>
                    </div>
                    <div className="job-prefer-text">
                        <span>Tell us what you’re looking for in a job and we’ll use this information to recommend the best jobs to you. This information will not be visible to employers.</span>
                    </div>
                    <div className="job-prefer-search-status">
                        <div className="job-prefer-search-status-text">
                            <span>Where are you in your job search?</span>
                        </div>
                        <div className="job-prefer-search-status-select">
                            <form className="job-prefer-search-status-form">
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="joinSearchStatus">Select job search status</label>
                                        <select className="custom-select" id="joinSearchStatus" onChange={ this.searchStatusChange }>
                                            <option value="">Select</option>
                                            <option value="Not Looking">Not Looking</option>
                                            <option value="Not Looking, but open">Not Looking, but open</option>
                                            <option value="Casually looking">Casually looking</option>
                                            <option value="MastActively Lookinger">Actively Looking</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="job-prefer-job-title">
                            <div className="job-prefer-job-title-text">
                                <span>What job titles are you looking for?</span>
                            </div>
                            <div className="job-prefer-job-title-add">
                                <div className="add-title-icon" onClick={ this.showAddTitle }>+ Add Job Title</div>
                                <div className="job-title">
                                    <span >Software Engineer</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="remove-job-title" onClick={ this.removeJobTitle }>
                                        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                                            <path fill="#fff" d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="add-title-input" id="add-title-input">
                                    <form className="popup-form">
                                        <div className="form-row">
                                            <div className="form-group col-10">
                                                <label htmlFor="jobPrefInputTitle">Job Title</label>
                                                <input type="text" className="form-control" id="jobPrefInputTitle" placeholder="Job Title" />
                                            </div>
                                            <div className="form-group col-2">
                                                <label>Add</label>
                                                <button type="button" className="btn btn-primary form-control" onClick={ this.addJobTitle }>Add</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="job-prefer-salary">
                            <div className="job-prefer-salary-text">
                                <span>What is your target salary range?</span>
                            </div>
                            <div className="job-prefer-salary-add">
                                <div className="job-prefer-salary-add-button" id="salary-add-title" onClick={ this.showSalary }>+ Add Salary Range</div>
                                <div className="salary-add-div" id="salary-add-div">
                                    <div className="salary-add-title">
                                        Add Salary Range
                                    </div>
                                    <div className="salary-add-form">
                                        <form className="popup-form">
                                            <div className="form-row">
                                                <div className="form-group col-6">
                                                    <label htmlFor="jobPrefInputSalaryStart">From</label>
                                                    <input type="text" className="form-control" id="jobPrefInputSalaryStart" placeholder="" />
                                                </div>
                                                <div className="form-group col-6">
                                                    <label htmlFor="jobPrefInputSalaryEnd">To</label>
                                                    <input type="text" className="form-control" id="jobPrefInputSalaryEnd" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="jobPrefInputSalaryPeriod">Pay Period</label>
                                                <select className="custom-select" id="jobPrefInputSalaryPeriod" onChange={ this.salaryPeriodChange }>
                                                    <option value="">Select</option>
                                                    <option value="Per Year">Per Year</option>
                                                    <option value="Per Month">Per Month</option>
                                                    <option value="Per Hour">Per Hour</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <Footer closePopup={ this.closeSalaryPopup } saveChanges={ this.saveSalary } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="company-preference-wrapper">
                    <div className="job-prefer-title">
                        <h3>Company Preferences</h3>
                    </div>
                    <div className="job-prefer-text">
                        <span>We use this information to help find you the best company matches.</span>
                    </div>
                    <div className="job-prefer-search-status">
                        <div className="job-location-pref">
                            <div className="job-prefer-search-status-text">
                                <span>Where would you prefer to work?</span>
                            </div>
                            <div className="relocation-checkbox">
                                <input type="checkbox" checked={ this.state.relocationChecked } onChange={ this.changeJobLocation } />&nbsp;&nbsp;<label>I'm open to relocation</label>
                            </div>
                        </div>
                    </div>
                    <div className="job-industry-pref">
                        <div className="job-prefer-search-status-text">
                            <span>What industries do you prefer?</span>
                        </div>
                        <div className="job-title">
                            <span >Information Technology</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="remove-job-title" onClick={ this.removeIndustry }>
                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                                    <path fill="#fff" d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                                </svg>
                            </span>
                        </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-10">
                                    <label htmlFor="jobPrefInputIndustry">Industry</label>
                                    <input type="text" className="form-control" id="jobPrefInputIndustry" placeholder="Industry" />
                                </div>
                                <div className="form-group col-2">
                                    <label>Add</label>
                                    <button type="button" className="btn btn-primary form-control" onClick={ this.addIndustry }>Add</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default JobPreference;
import React, { Component } from 'react'
import axios from 'axios'

import './JobPreference.css'
import SEO from '../../../SEO/SEO'
import Footer from '../../../Popup/Footer'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class JobPreference extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            relocationChecked: false,
            searchStatus: "",
            jobTitle: "",
            targetSalary: "",
            openToRelocation: false,
            typeOfIndustry: "",
            salaryFrom: "",
            salaryTo: "",
            payPeriod: "",
            isEmployerActive: false
        }
    }

    componentDidMount () {
        SEO( {
            title: "Job Preferences | Glassdoor"
        } )
        if ( this.props.active ) {
            this.setState( {
                isEmployerActive: true
            } )
        }
        let id = null
        if ( this.props.studentID ) {
            id = this.props.studentID
        } else {
            id = localStorage.getItem( "id" )
        }
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/students/getUser/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.setState( {
                            searchStatus: res.data.jobPreference.searchStatus,
                            jobTitle: res.data.jobPreference.jobTitle,
                            targetSalary: res.data.jobPreference.targetSalary,
                            openToRelocation: res.data.jobPreference.openToRelocation,
                            typeOfIndustry: res.data.jobPreference.typeOfIndustry,
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

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    sendJobPreferenceUpdate = () => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            let jobPreference = {
                searchStatus: this.state.searchStatus,
                jobTitle: this.state.jobTitle,
                targetSalary: this.state.targetSalary,
                openToRelocation: this.state.openToRelocation,
                typeOfIndustry: this.state.typeOfIndustry,
            }
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/students/updateUserJobPreferences/" + id, jobPreference )
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

    searchStatusChange = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            searchStatus: e.target.value
        }, () => {
            this.sendJobPreferenceUpdate()
        } )
    }

    saveSalary = () => {
        this.setState( {
            targetSalary: this.state.salaryFrom + " - " + this.state.salaryTo + " " + this.state.payPeriod
        }, () => {
            this.sendJobPreferenceUpdate()
            this.closeSalaryPopup()
        } )
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
        this.sendJobPreferenceUpdate()
    }

    showSalary = ( e ) => {
        e.preventDefault()
        let addSalaryDiv = document.getElementById( "salary-add-div" )
        let addSalary = document.getElementById( "salary-add-title" )
        addSalaryDiv.classList.add( "salary-add-div-show" )
        addSalary.classList.add( "job-prefer-salary-add-button-hide" )
    }

    removeJobTitle = () => {
        this.setState( {
            jobTitle: ""
        }, () => {
            this.sendJobPreferenceUpdate()
        } )
    }

    closeSalaryPopup = ( e ) => {
        let addSalaryDiv = document.getElementById( "salary-add-div" )
        let addSalary = document.getElementById( "salary-add-title" )
        addSalaryDiv.classList.remove( "salary-add-div-show" )
        addSalary.classList.remove( "job-prefer-salary-add-button-hide" )
    }

    changeJobLocation = ( e ) => {
        e.preventDefault()
        this.setState( {
            openToRelocation: !this.state.openToRelocation
        }, () => {
            this.sendJobPreferenceUpdate()
        } )
    }

    addIndustry = ( e ) => {
        e.preventDefault()
        this.sendJobPreferenceUpdate()
    }

    removeIndustry = () => {
        this.setState( {
            typeOfIndustry: ""
        }, () => {
            this.sendJobPreferenceUpdate()
        } )
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
                        { this.state.isEmployerActive ?
                            <span className="employerSideAnswer">{ this.state.searchStatus }</span>
                            :
                            <div className="job-prefer-search-status-select">
                                <form className="job-prefer-search-status-form">
                                    <div className="form-row">
                                        <div className="form-group col-md">
                                            <label htmlFor="joinSearchStatus">Select job search status</label>
                                            <select className="custom-select" id="joinSearchStatus" value={ this.state.searchStatus } onChange={ this.searchStatusChange }>
                                                <option value="">Select</option>
                                                <option value="Not Looking">Not Looking</option>
                                                <option value="Not Looking, but open">Not Looking, but open</option>
                                                <option value="Casually looking">Casually looking</option>
                                                <option value="MastActively Lookinger">Actively Looking</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div> }
                        <div className="job-prefer-job-title">
                            <div className="job-prefer-job-title-text">
                                <span>What job titles are you looking for?</span>
                            </div>
                            { this.state.isEmployerActive ?
                                <div className="job-title">
                                    <span >{ this.state.jobTitle }</span>
                                </div>
                                :
                                <div className="job-prefer-job-title-add">
                                    <div className="add-title-icon" onClick={ this.showAddTitle }>+ Add Job Title</div>
                                    { this.state.jobTitle ?
                                        <div className="job-title">
                                            <span >{ this.state.jobTitle }</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span className="remove-job-title" onClick={ this.removeJobTitle }>
                                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                                                    <path fill="#fff" d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                                                </svg>
                                            </span>
                                        </div>
                                        : null }

                                    <div className="add-title-input" id="add-title-input">
                                        <form className="popup-form">
                                            <div className="form-row">
                                                <div className="form-group col-10">
                                                    <label htmlFor="jobPrefInputTitle">Job Title</label>
                                                    <input type="text" name="jobTitle" className="form-control" id="jobPrefInputTitle" placeholder="Job Title" value={ this.state.jobTitle } onChange={ this.onChange } />
                                                </div>
                                                <div className="form-group col-2">
                                                    <label>Add</label>
                                                    <button type="button" className="btn btn-primary form-control" onClick={ this.addJobTitle }>Add</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="job-prefer-salary">
                            <div className="job-prefer-salary-text">
                                <span>What is your target salary range?</span>
                            </div>
                            { this.state.isEmployerActive ?
                                <span className="employerSideAnswer">{ this.state.targetSalary }</span>
                                :
                                <div className="job-prefer-salary-add">
                                    <div className="job-prefer-salary-add-button" id="salary-add-title" onClick={ this.showSalary }>+ Add Salary Range</div>
                                    <div className="target-salary">
                                        { this.state.targetSalary ?
                                            this.state.targetSalary
                                            : null }
                                    </div>
                                    <div className="salary-add-div" id="salary-add-div">
                                        <div className="salary-add-title">
                                            Add Salary Range
                                    </div>
                                        <div className="salary-add-form">
                                            <form className="popup-form">
                                                <div className="form-row">
                                                    <div className="form-group col-6">
                                                        <label htmlFor="jobPrefInputSalaryStart">From</label>
                                                        <input type="text" name="salaryFrom" className="form-control" id="jobPrefInputSalaryStart" placeholder="" value={ this.state.salaryFrom } onChange={ this.onChange } />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="jobPrefInputSalaryEnd">To</label>
                                                        <input type="text" name="salaryTo" className="form-control" id="jobPrefInputSalaryEnd" placeholder="" value={ this.state.salaryTo } onChange={ this.onChange } />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="jobPrefInputSalaryPeriod">Pay Period</label>
                                                    <select className="custom-select" name="payPeriod" id="jobPrefInputSalaryPeriod" value={ this.state.payPeriod } onChange={ this.onChange }>
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
                            }
                        </div>
                    </div>
                </div>
                <div className="company-preference-wrapper">
                    <div className="job-prefer-title">
                        <h3>Company Preferences</h3>
                    </div>

                    <div>
                        <div className="job-prefer-text">
                            <span>We use this information to help find you the best company matches.</span>
                        </div>
                        <div className="job-prefer-search-status">
                            <div className="job-location-pref">
                                <div className="job-prefer-search-status-text">
                                    <span>Where would you prefer to work?</span>
                                </div>
                                { this.state.isEmployerActive ?
                                    this.state.openToRelocation ?
                                        <span className="employerSideAnswer">Yes, I am open to relocation</span>
                                        :
                                        <span className="employerSideAnswer">No, I am not open to relocation</span>
                                    :
                                    <div className="relocation-checkbox">
                                        <input type="checkbox" checked={ this.state.openToRelocation } onChange={ this.changeJobLocation } />&nbsp;&nbsp;<label>I'm open to relocation</label>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="job-industry-pref">
                        <div className="job-prefer-search-status-text">
                            <span>What industries do you prefer?</span>
                        </div>
                        { this.state.isEmployerActive ?
                            this.state.typeOfIndustry ?
                                <div className="job-title">
                                    <span >{ this.state.typeOfIndustry }</span>
                                </div>
                                : null
                            :
                            <div>
                                { this.state.typeOfIndustry ?
                                    <div className="job-title">
                                        <span >{ this.state.typeOfIndustry }</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="remove-job-title" onClick={ this.removeIndustry }>
                                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                                                <path fill="#fff" d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                                            </svg>
                                        </span>
                                    </div>
                                    : null }
                                <form className="popup-form">
                                    <div className="form-row">
                                        <div className="form-group col-10">
                                            <label htmlFor="jobPrefInputIndustry">Industry</label>
                                            <input type="text" name="typeOfIndustry" className="form-control" id="jobPrefInputIndustry" placeholder="Industry" onChange={ this.onChange } />
                                        </div>
                                        <div className="form-group col-2">
                                            <label>Add</label>
                                            <button type="button" className="btn btn-primary form-control" onClick={ this.addIndustry }>Add</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default JobPreference;
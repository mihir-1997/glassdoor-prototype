import React, { Component } from 'react'

import './JobLanding.css'
import intel_logo from '../../../Images/intel.png'
import JobDescription from './JobDescription'

export default class JobLanding extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            currActiveJob: "",
            selectedJobType: "All Job Type",
            selectedSalary: "Select salary range",
            selectedLocation: "Location",
            selectedSort: "Most Recent"
        }
    }

    showJobDescription = ( jobId ) => {
        if ( this.state.currActiveJob ) {
            let activeJob = document.getElementById( this.state.currActiveJob )
            activeJob.classList.remove( "active-job" )
            let nextActiveJob = document.getElementById( jobId )
            nextActiveJob.classList.add( "active-job" )
            this.setState( {
                currActiveJob: jobId
            } )
        } else {
            let nextActiveJob = document.getElementById( jobId )
            nextActiveJob.classList.add( "active-job" )
            this.setState( {
                currActiveJob: jobId
            } )
        }
    }

    changeJobType = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedJobType: e.target.value
        } )
    }

    changeSalary = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedSalary: e.target.value
        } )
    }

    changeLocation = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedLocation: e.target.value
        } )
    }

    sortClick = () => {
        let options = document.getElementById( "job-search-sort-option" )
        if ( options.classList.contains( "job-search-sort-option-show" ) ) {
            options.classList.remove( "job-search-sort-option-show" )
        } else {
            options.classList.add( "job-search-sort-option-show" )
        }
    }

    sortJobs = ( e ) => {
        e.preventDefault()
        if ( e.target.value === "recent" ) {

        } else if ( e.target.value === "ratings" ) {

        }
    }

    render () {
        let jobs = [ "intel", "intel1" ]
        return (
            <div>
                <div className="job-search-wrapper">
                    <div className="job-search">
                        <div className="job-search-filters">
                            <div className="row">
                                <div className="col-2">
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle navbar-dropdown-button job-type-filter" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            { this.state.selectedJobType }
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="All Job Types">All Job Types</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="Full-time">Full-time</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="Part-time">Part-time</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="Contract">Contract</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="Internship">Internship</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="Temporary">Temporary</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="Entry Level">Entry Level</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle navbar-dropdown-button salary-filter" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            { this.state.selectedSalary }
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="Select salary range">Select salary range</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="$10K-$50K">$10K-$50K</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="$51K-$100K">$51K-$100K</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="$101K-$200K">$101K-$200K</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="> $201K">&gt; $201K</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle navbar-dropdown-button location-filter" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            { this.state.selectedLocation }
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <button className="dropdown-item" type="button" onClick={ this.changeLocation } value="Location">Location</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeLocation } value="San Jose">San Jose</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeLocation } value="Santa Francisco">Santa Francisco</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2"></div>
                            </div>
                        </div>
                        <div className="job-search-display clear-float">
                            <div className="job-search-display-left left-pane">
                                <div className="job-search-sort-wrapper clear-float">
                                    <div className="left-pane">
                                        <div className="job-search-sort-div" onClick={ this.sortClick }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M21 5a1 1 0 010 2H3a1 1 0 010-2zm-6 6a1 1 0 010 2H3a1 1 0 010-2zm-4 6a1 1 0 010 2H3a1 1 0 010-2z" fill="currentColor" fillRule="evenodd"></path>
                                            </svg>&nbsp;
                                            <span>{ this.state.selectedSort }</span>
                                        </div>
                                        <div className="job-search-sort-option" id="job-search-sort-option">
                                            <button className="dropdown-item" type="button" onClick={ this.sortJobs } value="recent">
                                                Most Recent
                                            </button>
                                            <button className="dropdown-item" type="button" onClick={ this.sortJobs } value="ratings">
                                                Most Rated
                                        </button>
                                        </div>
                                    </div>
                                    <div className="right-pane">
                                        <div className="job-search-total-jobs-wrapper">
                                            {/* {this.state.totalJobs} {this.props.searchTerm} Jobs */ }
                                            534 Intel Jobs
                                        </div>
                                    </div>
                                </div>
                                { jobs.map( ( job, index ) => {
                                    return <div className="clear-float" key={ index }>
                                        <div id={ job + index } className="each-job" onClick={ () => this.showJobDescription( job + index ) }>
                                            <div className="each-job-left-pane left-pane">
                                                <div className="each-job-company-logo">
                                                    <div className="company-logo-wrapper">
                                                        <img className="company-logo" src={ intel_logo } alt="company_logo" />
                                                    </div>
                                                </div>
                                                <div className="each-job-company-ratings">
                                                    <span>
                                                        4.1
                                                {/* {job.avg_ratings} */ }
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                                            <path fill="#0CA941" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="each-job-right-pane right-pane">
                                                <div className="each-job-company-name">
                                                    {/* {job.company_name} */ }
                                                Intel
                                            </div>
                                                <div className="each-job-title">
                                                    {/* {job.title} */ }
                                                SW DevOps Engineer
                                            </div>
                                                <div className="each-job-location">
                                                    {/* {job.location} */ }
                                                Austin, TX
                                            </div>
                                                <div className="each-job-salary">
                                                    {/* {job.salary} */ }
                                                $59k-$99k
                                            </div>
                                                <div className="each-job-date-wrapper">
                                                    <div className="each-job-date">
                                                        {/* {job.date} */ }
                                                11/10/2020
                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                } ) }
                            </div>
                            <div className="job-search-display-right right-pane">
                                <JobDescription />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

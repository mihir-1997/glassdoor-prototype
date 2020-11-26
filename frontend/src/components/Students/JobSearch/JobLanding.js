import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'

import './JobLanding.css'
import JobDescription from './JobDescription'
import Page from '../../Pagination/Page'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

export default class JobLanding extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            allJobs: [],
            filteredJobs: [],
            allLocations: [],
            currActiveJob: "",
            activeJobDescription: {},
            selectedJobType: "All Job Type",
            selectedSalary: "Select salary range",
            selectedLocation: "Location",
            selectedSort: "Most Recent",
            currPage: 1,
            eachPageSize: 10
        }
    }

    componentDidMount () {
        if ( this.props.location.state ) {
            if ( this.props.location.state.searchTerm ) {
                let id = localStorage.getItem( "id" )
                if ( id ) {
                    axios.defaults.withCredentials = true
                    axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                    axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsBasedOnTitle/" + this.props.location.state.searchTerm )
                        .then( ( res ) => {
                            if ( res.status === 200 ) {
                                console.log( res.data )
                                this.setState( {
                                    allJobs: res.data,
                                    filteredJobs: res.data,
                                    allLocations: Array.from( new Set( res.data.map( data => data.city ) ) )
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
        }
    }

    showJobDescription = ( job, index ) => {
        if ( this.state.currActiveJob ) {
            let activeJob = document.getElementById( this.state.currActiveJob )
            if ( activeJob ) {
                activeJob.classList.remove( "active-job" )
            }
            let nextActiveJob = document.getElementById( job._id )
            if ( nextActiveJob ) {
                nextActiveJob.classList.add( "active-job" )
            }
            this.setState( {
                currActiveJob: job._id
            } )
        } else {
            let nextActiveJob = document.getElementById( job._id )
            nextActiveJob.classList.add( "active-job" )
            this.setState( {
                currActiveJob: job._id
            } )
        }
        this.setState( {
            activeJobDescription: job
        } )
    }

    changeJobType = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedJobType: e.target.value
        }, () => {
            if ( this.state.selectedJobType === "All Job Types" ) {
                this.setState( {
                    filteredJobs: this.state.allJobs
                } )
            } else {
                this.setState( {
                    filteredJobs: this.state.allJobs.filter( job => job.type.toUpperCase() === this.state.selectedJobType.toUpperCase() )
                } )
            }
        } )
    }

    changeSalary = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedSalary: e.target.value
        }, () => {
            if ( this.state.selectedSalary === "Select salary range" ) {
                this.setState( {
                    filteredJobs: this.state.allJobs
                } )
                return
            }
            this.setState( {
                filteredJobs: this.state.allJobs.filter( job => job.salary >= parseInt( this.state.selectedSalary.split( "-" )[ 0 ] ) && job.salary <= parseInt( this.state.selectedSalary.split( "-" )[ 1 ] ) )
            } )
        } )
    }

    changeLocation = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedLocation: e.target.value
        } )
    }

    locationFilterChange = ( e ) => {
        this.setState( {
            selectedLocation: e[ 0 ]
        }, () => {
            if ( this.state.selectedLocation ) {
                this.setState( {
                    filteredJobs: this.state.allJobs.filter( job => job.city === this.state.selectedLocation )
                } )
            } else {
                this.setState( {
                    filteredJobs: this.state.allJobs
                } )
            }
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

    handlePageChange = ( value ) => {
        this.setState( {
            currPage: value,
            activeJobDescription: this.state.filteredJobs[ value * this.state.eachPageSize - this.state.eachPageSize ]
        }, () => {
            document.getElementById( this.state.filteredJobs[ value * this.state.eachPageSize - this.state.eachPageSize ]._id ).classList.add( "active-job" )
        } )
    }

    render () {
        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        let getDate = ( date ) => {
            let formattedDate = new Date( parseInt( date ) )
            return ( formattedDate.getMonth() + 1 ) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
        }
        return (
            <div>
                {redirectVar }
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
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="Remote">Remote</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeJobType } value="In-person">In-person</button>
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
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="10000-50000">$10K-$50K</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="51000-100000">$51K-$100K</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="101000-200000">$101K-$200K</button>
                                            <button className="dropdown-item" type="button" onClick={ this.changeSalary } value="201000-300000">&gt; $201K</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="dropdown">
                                        <Typeahead id="locationFilter" name="locationFilter" options={ this.state.allLocations } paginate={ false } placeholder="Location" onChange={ this.locationFilterChange } />
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
                                            { this.state.filteredJobs.length } { this.props.location.state.searchTerm } Jobs
                                        </div>
                                    </div>
                                </div>
                                { this.state.filteredJobs ?
                                    this.state.filteredJobs.slice( this.state.currPage * this.state.eachPageSize - this.state.eachPageSize, this.state.currPage * this.state.eachPageSize ).map( ( job, index ) => {
                                        return <div className="clear-float" key={ index }>
                                            <div id={ job._id } className="each-job" onClick={ () => this.showJobDescription( job, index ) }>
                                                <div className="each-job-left-pane left-pane">
                                                    <div className="each-job-company-logo">
                                                        <div className="company-logo-wrapper">
                                                            {/* <img className="company-logo" src={ intel_logo } alt="company_logo" /> */ }
                                                        </div>
                                                    </div>
                                                    <div className="each-job-company-ratings">
                                                        {/* <span>
                                                        4.1
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                                            <path fill="#0CA941" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                                                        </svg>
                                                    </span> */}
                                                    </div>
                                                </div>
                                                <div className="each-job-right-pane right-pane">
                                                    <div className="each-job-company-name">
                                                        { job.employerName }
                                                    </div>
                                                    <div className="each-job-title">
                                                        { job.title }
                                                    </div>
                                                    <div className="each-job-location">
                                                        { job.city }
                                                    </div>
                                                    <div className="each-job-salary">
                                                        { job.salary ?
                                                            <span>${ job.salary }</span>
                                                            : null }
                                                    </div>
                                                    <div className="each-job-date-wrapper">
                                                        <div className="each-job-date">
                                                            { job.date ?
                                                                getDate( job.date )
                                                                : null }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    } )
                                    : null }
                                { this.state.filteredJobs.length > 0 ?
                                    <Page dataLength={ this.state.filteredJobs.length } eachPageSize={ this.state.eachPageSize } handlePageChange={ this.handlePageChange } />
                                    : null }
                            </div>
                            { this.state.activeJobDescription._id ?
                                <div className="job-search-display-right right-pane">
                                    <JobDescription key={ Math.random() } job={ this.state.activeJobDescription } />
                                </div>
                                : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

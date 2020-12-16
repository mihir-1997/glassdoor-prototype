import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'
import { withRouter } from "react-router"
import $ from 'jquery'

import './JobLanding.css'
import JobDescription from './JobDescription'
import Page from '../../Pagination/Page'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import IndividualJobCard from './IndividualJobCard'

class JobLanding extends Component {

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
            eachPageSize: 4
        }
    }

    componentDidMount () {
        if ( this.props.location.state !== undefined ) {
            if ( this.props.location.state.searchTerm !== undefined ) {
                let id = localStorage.getItem( "id" )
                if ( id ) {
                    axios.defaults.withCredentials = true
                    axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                    axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsBasedOnTitle/" + this.props.location.state.searchTerm )
                        .then( ( res ) => {
                            if ( res.status === 200 ) {
                                this.setState( {
                                    allJobs: res.data.sort( ( a, b ) => {
                                        return new Date( b.date ) - new Date( a.date )
                                    } ),
                                    filteredJobs: res.data.sort( ( a, b ) => {
                                        return new Date( b.date ) - new Date( a.date )
                                    } ),
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
        } else {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getApplicationStatus/" + id )
                    .then( ( res ) => {
                        if ( res.status === 200 ) {
                            console.log( "getapplicationstatus", res.data )
                            this.setState( {
                                filteredJobs: res.data
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

    componentDidUpdate ( prevProps ) {
        if ( this.props.location.state !== undefined ) {
            if ( prevProps.location.state !== undefined ) {
                if ( prevProps.location.state.searchTerm !== this.props.location.state.searchTerm ) {
                    this.componentDidMount()
                }
            } else {
                this.componentDidMount()
            }
        }
    }

    showJobDescription = ( job ) => {
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

    saveAvgRatings = ( jobId, avgRatings ) => {
        this.state.allJobs.forEach( job => {
            if ( jobId === job._id ) {
                job.avgRatings = avgRatings
            }
        } )
        this.state.filteredJobs.forEach( job => {
            if ( jobId === job._id ) {
                job.avgRatings = avgRatings
            }
        } )
    }

    changeJobType = ( e ) => {
        e.preventDefault()
        this.setState( {
            selectedJobType: e.target.value
        }, () => {
            if ( this.state.selectedJobType === "All Job Types" ) {
                this.setState( {
                    filteredJobs: this.state.allJobs,
                    avgRatings: []
                } )
            } else {
                this.setState( {
                    filteredJobs: this.state.allJobs.filter( job => job.type.toUpperCase() === this.state.selectedJobType.toUpperCase() ),
                    avgRatings: []
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
                    filteredJobs: this.state.allJobs,
                    avgRatings: []
                } )
                return
            }
            this.setState( {
                filteredJobs: this.state.allJobs.filter( job => job.salary >= parseInt( this.state.selectedSalary.split( "-" )[ 0 ] ) && job.salary <= parseInt( this.state.selectedSalary.split( "-" )[ 1 ] ) ),
                avgRatings: []
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
                    filteredJobs: this.state.allJobs.filter( job => job.city === this.state.selectedLocation ),
                    avgRatings: []
                } )
            } else {
                this.setState( {
                    filteredJobs: this.state.allJobs,
                    avgRatings: []
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
            console.log( "insde recent sort" )
            this.setState( {
                filteredJobs: this.state.filteredJobs.sort( ( a, b ) => {
                    console.log( a.date, new Date( b.date ) )
                    return new Date( b.date ) - new Date( a.date )
                } ),
                selectedSort: "Most Recent",
                activeJobDescription: ""
            } )
        } else if ( e.target.value === "ratings" ) {
            this.setState( {
                selectedSort: "Most Rated",
                activeJobDescription: "",
                filteredJobs: this.state.filteredJobs.sort( ( a, b ) => {
                    if ( a.avgRatings !== undefined && b.avgRatings !== undefined ) {
                        console.log( a.avgRatings, b.avgRatings )
                        return b.avgRatings - a.avgRatings
                    } return 5
                } )
            } )
        }
        this.sortClick()
    }

    handlePageChange = ( value ) => {
        console.log( "handle page change" )
        this.setState( {
            currPage: value,
            activeJobDescription: ""
        }, () => {
            $( ".each-job" ).removeClass( "active-job" )
        } )
    }

    render () {
        let redirectVar = null
        if ( localStorage.getItem( "active" ) !== "students" ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        return (
            <div>
                {redirectVar }
                <div className="job-search-wrapper">
                    <div className="job-search">
                        { this.props.location.state ?
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
                            : null }
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
                                    { this.props.location.state ?
                                        <div className="right-pane">
                                            <div className="job-search-total-jobs-wrapper">
                                                { this.state.filteredJobs.length } { this.props.location.state.searchTerm } Jobs
                                        </div>
                                        </div>
                                        : null }
                                </div>
                                { this.state.filteredJobs ?
                                    this.state.filteredJobs.slice( this.state.currPage * this.state.eachPageSize - this.state.eachPageSize, this.state.currPage * this.state.eachPageSize ).map( ( job, index ) => {
                                        return <IndividualJobCard jobDetails={ job } key={ index + job._id } showJobDescription={ this.showJobDescription } saveAvgRatings={ this.saveAvgRatings } />
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

export default withRouter( JobLanding );
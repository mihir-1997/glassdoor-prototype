import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead'

import './EmployerJobs.css'
import AddJob from './AddJob'
import IndividualJob from './individualJob'
import Paginate from '../../Pagination'
import jobCover from '../../../Images/job.jpg'
import bestPlaces from '../../../Images/best_places.jpg'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'


class EmployerJobs extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            jobs: [],
            filteredJobs: [],
            allLocations: [],
            logoImageUrl: "",
            currentPage: 1,
            totalCount: "",
            elementsPerPage: 5,
            jobStats: {},
            employerName: "",
            employer_id: "",
            jobSearchTerm: "",
            isStudent: false
        }
    }

    componentDidMount () {
        SEO( {
            title: "Jobs | Glassdoor"
        } )
        let name = null
        let id = null
        if ( this.props.location ) {
            if ( this.props.location.state ) {
                name = this.props.location.state.employerName
                id = this.props.location.state.employerID
                this.setState( {
                    isStudent: true,
                } )
            } else {
                name = localStorage.getItem( "name" )
                id = localStorage.getItem( "id" )
            }
        } else {
            name = localStorage.getItem( "name" )
            id = localStorage.getItem( "id" )
        }
        console.log( id )
        this.setState( {
            employerName: name,
            employer_id: id
        } )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/employers/getEmployerById/" + id )
                .then( ( res ) => {
                    //console.log(res)
                    if ( res.status === 200 ) {
                        this.setState( {
                            logoImageUrl: res.data.logoImageUrl,
                        } )
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
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsForEmployer/" + id, {
                "firstTime": true,
                "pageNumber": 1,
                "pageSize": 5
            } )
                .then( ( res ) => {
                    console.log( res.data )
                    if ( res.status === 200 ) {
                        this.setState( {
                            jobs: res.data.jobs,
                            filteredJobs: res.data.jobs,
                            allLocations: Array.from( new Set( res.data.jobs.map( data => data.city ) ) ),
                            totalCount: res.data.totalCount
                        } )
                        //console.log(this.state.jobs)
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

    // Change page
    paginate = ( pageNumber ) => {
        console.log( "pagenumber ", pageNumber );

        // let id = localStorage.getItem( "id" )
        if ( this.state.employer_id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsForEmployer/" + this.state.employer_id, { firstTime: false, pageSize: 5, pageNumber: pageNumber } )
                .then( ( res ) => {
                    console.log( res.data )
                    if ( res.status === 200 ) {
                        this.setState( {
                            jobs: res.data.jobs,
                            filteredJobs: res.data.jobs,
                            allLocations: Array.from( new Set( res.data.jobs.map( data => data.city ) ) )
                        } )
                        console.log( this.state.jobs )
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

    };

    searchJob = ( e ) => {
        e.preventDefault()
        if ( e.target.value ) {
            this.setState( {
                jobSearchTerm: e.target.value,
                filteredJobs: this.state.filteredJobs.filter( job => job.title.toUpperCase().startsWith( e.target.value.toUpperCase() ) )
            } )
        } else {
            this.setState( {
                filteredJobs: this.state.jobs
            } )
        }
    }

    locationFilterChange = ( e ) => {
        this.setState( {
            selectedLocation: e[ 0 ]
        }, () => {
            if ( this.state.selectedLocation ) {
                this.setState( {
                    filteredJobs: this.state.jobs.filter( job => job.city === this.state.selectedLocation )
                } )
            } else {
                this.setState( {
                    filteredJobs: this.state.jobs
                } )
            }
        } )
    }

    addJob = ( e ) => {
        e.preventDefault()

        let popup = document.getElementById( "add-job-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    render () {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        let allJobs = this.state.filteredJobs.map( ( eachJob ) => {
            return (
                <IndividualJob
                    key={ Math.random() }
                    data={ eachJob }
                    logo={ this.state.logoImageUrl }
                    isStudent={ this.state.isStudent }
                ></IndividualJob>
            );
        } )

        return (
            <div className="employer-profile-wrapper">
                {redirectVar }
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={ jobCover } alt="Cover" />
                    </div>
                    <div className="details-wrapper">
                        <div className="employer-company-logo">
                            <img className="logo" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.logoImageUrl } alt="logo" />
                        </div>
                        <div className="details">
                            <h3 style={ { marginTop: "10px" } }> { this.state.employerName } </h3>
                            <br />
                            <br />
                        </div>
                        <div className="row multiple-links">
                            { this.state.isStudent ?
                                <div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/profile", state: { employerID: this.state.employer_id } } } >Overview</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/reviews", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Reviews</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/jobs", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Jobs</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/salaries", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Salaries</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/interviews", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Interviews</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/photos", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Photos</Link></div>
                                    { localStorage.getItem( "active" ) === "admin" ?
                                        <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/reports", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Reports</Link> </div>
                                        :
                                        null }
                                </div>
                                :
                                <div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/profile">Overview</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/reviews">Reviews</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/jobs">Jobs</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/salaries">Salaries</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/interviews">Interviews</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/photos">Photos</a></div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/reports">Reports</a> </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="info-wrapper" style={ {} }>

                        <p style={ { fontSize: "20px", lineHeight: "27px", marginLeft: "1px", fontWeight: "bolder", textAlign: "center" } }>Jobs at { this.state.employerName }</p>

                        <hr />
                        <div className="employer-job-search-wrapper">
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" name="jobSearchTerm" className="form-control" placeholder="Search Job" onChange={ this.searchJob } />
                                </div>
                                <div className="col-6">
                                    <Typeahead id="locationFilter" name="locationFilter" options={ this.state.allLocations } paginate={ false } placeholder="Location" onChange={ this.locationFilterChange } />
                                </div>
                            </div>
                        </div>
                        { allJobs }
                        <Paginate
                            elementsPerPage={ this.state.elementsPerPage }
                            totalElements={ this.state.totalCount }
                            paginate={ this.paginate }
                        />
                    </div>

                    <div className="form-wrapper-jobs">
                        { this.state.isStudent ?
                            null :
                            <div>
                                <button onClick={ this.addJob } className="emp-profile-btn btn btn-primary d-flex justify-content-center align-items-center" style={ { marginLeft: "75px", marginBottom: "15px", marginTop: "15px", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191),", } }>+ Add Job</button>
                                <AddJob
                                    logo={ this.state.logoImageUrl }
                                />
                                <div style={ { margin: "0% 0% 0% 10%" } }>
                                    <img style={ { width: "91%", height: "140%" } } src={ bestPlaces } alt="Best Places to work in 2020" />
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        )
    }
}
export default EmployerJobs;
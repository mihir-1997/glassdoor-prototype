import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import './EmployerInterviews.css'
import Paginate from '../../Pagination'
import IndividualInterview from './individualInterview'
import interviewCover from '../../../Images/interview.jpg'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'



class EmployerInterviews extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            interviews: [],
            logoImageUrl: "",

            //paginate   
            elementsPerPage: 3,
            currentPage:1,
            totalCount:0
        }
    }

    componentDidMount () {
        SEO( {
            title: "Interviews | Glassdoor"
        } )

        let id = localStorage.getItem( "id" )
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
        let name = null
        if ( this.props.location ) {
            if ( this.props.location.state ) {
                name = this.props.location.state.searchTerm
            } else {
                name = localStorage.getItem( "name" )
            }
        }
        console.log( name )
        if ( name ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getInterviewsByEmployer/" + name, { firstTime: true, pageSize: 3, pageNumber: 1 } )
                .then( ( res ) => {
                    console.log(res.data)
                    if ( res.status === 200 ) {
                        this.setState( {
                            interviews: res.data.interview,
                            totalCount: res.data.interviewStats.totalCount
                        } )
                        //console.log( this.state.interviews )
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
    paginate = (pageNumber) => {
        console.log("pagenumber ", pageNumber);
        
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsForEmployer/" + id,{firstTime:false, pageSize:3,pageNumber:pageNumber} )
                .then( ( res ) => {
                        console.log(res.data)
                    if ( res.status === 200 ) {
                        this.setState( {
                            jobs:res.data.jobs,
                            
                        } )
                        console.log(this.state.jobs)
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

    render () {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

        let allInterviews = this.state.interviews.map( ( eachinterview ) => {

            return (
                <IndividualInterview
                    key={ Math.random() }
                    data={ eachinterview }
                    logo={ this.state.logoImageUrl }
                ></IndividualInterview>
            );
        } )

        return (

            <div className="employer-profile-wrapper">
                {redirectVar }
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={ interviewCover } alt="Cover" />
                    </div>
                    <div className="details-wrapper">
                        <div className="employer-company-logo">
                            <img className="logo" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.logoImageUrl } alt="logo" />
                        </div>
                        <div className="details">
                            <h3 style={ { marginTop: "10px" } }> { localStorage.getItem( "name" ) } </h3>
                            <br />
                            <br />
                        </div>
                        <div className="row multiple-links">
                            <div className="col-1.2 single-link"><a href="/employer/profile">Overview</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/reviews">Reviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/jobs">Jobs</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/salaries">Salaries</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/interviews">Interviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/photos">Photos</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/reports">Reports</a> </div>

                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"320px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>Follow</button> */ }
                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"10px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}> + Add Review</button> */ }

                        </div>
                    </div>
                    <div className="interview-info-wrapper" style={ { } }>
                        <p style={ { fontSize: "20px", lineHeight: "27px", marginLeft: "0px", fontWeight: "bold" } }>Interviews at { localStorage.getItem( "name" ) } </p>
                        <hr />
                        { allInterviews }
                        <Paginate
                         elementsPerPage= {this.state.elementsPerPage}
                         totalElements={this.state.totalCount}
                         paginate={this.paginate}
                        />

                    </div>

                    <div className="interview-form-wrapper">
                        form
                    </div>
                </div>

            </div>
        )
    }
}
export default EmployerInterviews;
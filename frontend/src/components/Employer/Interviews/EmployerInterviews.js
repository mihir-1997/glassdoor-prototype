import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import { Link } from 'react-router-dom';

import './EmployerInterviews.css'
import Paginate from '../../Pagination'
import IndividualInterview from './individualInterview'
import interviewCover from '../../../Images/interview.jpg'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import DonutChart from '../../Charts/Donutchart/Donutchart';



class EmployerInterviews extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            employer_id: "",
            interviews: [],
            logoImageUrl: "",
            employerName: "",
            isStudent: false,
            redirectToAddContribution: false,
            interviewStats: {},
            donuChartData: [],
            //paginate 
            elementsPerPage: 4,
            currentPage: 1,
            totalCount: 0

        }
    }

    componentDidMount () {
        SEO( {
            title: "Interviews | Glassdoor"
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
        console.log( name )
        if ( name ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getInterviewsByEmployer/" + name, { firstTime: true, pageSize: this.state.elementsPerPage, pageNumber: 1 } )
                .then( ( res ) => {
                    console.log( res.data )
                    if ( res.status === 200 ) {
                        this.setState( {
                            interviews: res.data.interview,
                            totalCount: res.data.interviewStats.totalCount,
                            interviewStats: res.data.interviewStats,
                            donuChartData: [
                                {
                                    "name": "Positive",
                                    "value": res.data.interviewStats.positive ? parseInt( res.data.interviewStats.positive ) : 0
                                },
                                {
                                    "name": "Neutral",
                                    "value": res.data.interviewStats.neutral ? parseInt( res.data.interviewStats.neutral ) : 0
                                },
                                {
                                    "name": "Negative",
                                    "value": res.data.interviewStats.negative ? parseInt( res.data.interviewStats.negative ) : 0
                                },
                            ]
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

    paginate = ( pageNumber ) => {
        console.log( "pagenumber ", pageNumber );

        if ( this.state.employerName ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getInterviewsByEmployer/" + this.state.employerName, { firstTime: false, pageSize: this.state.elementsPerPage, pageNumber: pageNumber } )

                .then( ( res ) => {
                    console.log( res.data )
                    if ( res.status === 200 ) {
                        this.setState( {
                            interviews: res.data.interview,

                        } )
                        console.log( this.state.interview )

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

    addInterview = ( e ) => {
        e.preventDefault()
        this.setState( {
            redirectToAddContribution: true
        } )
    }

    render () {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        if ( this.state.redirectToAddContribution ) {
            redirectVar = <Redirect to="/students/addcontribution" />
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

        // const data01 = [
        //     {
        //         "name": "Positive",
        //         "value": this.state.interviewStats.positive
        //     },
        //     {
        //         "name": "Neutral",
        //         "value": this.state.interviewStats.neutral
        //     },
        //     {
        //         "name": "Negative",
        //         "value": this.state.interviewStats.negative
        //     },
        // ];
        const colors = [
            "#94DA66",
            "#194383",
            "#0CA941"
        ]

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
                    <div className="interview-info-wrapper" style={ {} }>
                        <div className="">
                            { this.state.donuChartData ?
                                <DonutChart key={ Math.random() } data={ this.state.donuChartData } colors={ colors } />
                                :
                                null }
                        </div>
                        <p style={ { fontSize: "20px", lineHeight: "27px", marginLeft: "0px", fontWeight: "bold" } }>Interviews at { this.state.employerName } </p>
                        <hr />
                        { allInterviews }
                        <Paginate
                            elementsPerPage={ this.state.elementsPerPage }
                            totalElements={ this.state.totalCount }
                            paginate={ this.paginate }
                        />

                    </div>

                    <div className="interview-form-wrapper">
                        { localStorage.getItem( "active" ) === "admin" ?
                            null
                            :
                            this.state.isStudent ?
                                <button onClick={ this.addInterview } className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={ { marginLeft: "200px", marginBottom: "15px", marginTop: "15px", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)" } }>+ Add Interview</button>
                                :
                                null
                        }
                    </div>
                </div>

            </div>
        )
    }
}
export default EmployerInterviews;
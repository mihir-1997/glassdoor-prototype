import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import './EmployerSalaries.css'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import salaryCover from '../../../Images/employer.png'
import SEO from '../../SEO/SEO'

class EmployerSalaries extends Component {

    constructor( props ) {
        SEO( {
            title: "Salaries | Glassdoor"
        } )

        super( props )
        this.state = {
            salaries: {},
            logoImageUrl: ""
        }
    }
    componentDidMount () {
        SEO( {
            title: "Salaries | Glassdoor"
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
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getSalariesByEmployer/" + name, { "firstTime": true, "pageNumber": 1, "pageSize": 100 } )
            .then( ( res ) => {

                if ( res.status === 200 ) {

                    this.setState( {
                        salaries: res.data.salaryStats.salary_by_jobTitle
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

    render () {

        let IndividualSalary = ( key, obj ) => {
            return (
                <div key={ key } style={ { border: "1px solid black", padding: "10px", marginBottom: "3px" } }>
                    <div>
                        <div style={ { display: "inline-block" } } className="col-4"> <span style={ { fontSize: "25px" } }>{ key }</span> </div>
                        <div style={ { display: "inline-block" } } className="col-4">
                            <svg style={ { left: "200px" } } class="SVGInline-svg" height="32" viewBox="0 0 6 32" width="6" xmlns="http://www.w3.org/2000/svg"><path d="M1 .86l4 15.492m0 0L1 32" fill="none" stroke="#c4c7cc" stroke-linecap="square"></path></svg>
                            <span style={ { marginLeft: "80px" } }>
                                <div style={ { display: "inline-block", fontStyle: "sans-serif", fontSize: "18px" } }>
                                    <span style={ { fontStyle: "sans-serif", fontWeight: "bold", color: "green" } }>Min</span>
                                    <span style={ { fontWeight: "bold" } }>{ obj.min }</span>
                                </div>
                            </span>
                        </div>
                        <div style={ { display: "inline-block" } } className="col-4">
                            <svg class="SVGInline-svg" height="32" viewBox="0 0 6 32" width="6" xmlns="http://www.w3.org/2000/svg"><path d="M1 .86l4 15.492m0 0L1 32" fill="none" stroke="#c4c7cc" stroke-linecap="square"></path></svg>
                            <span style={ { marginLeft: "80px" } }>
                                <div style={ { display: "inline-block", fontStyle: "sans-serif", fontSize: "18px" } }>
                                    <span style={ { fontStyle: "sans-serif", fontWeight: "bold", color: "green" } }>Max</span>
                                    <span style={ { fontWeight: "bold" } }>{ obj.max }</span>
                                </div>
                            </span>
                        </div>


                    </div>

                </div>
            )
        }

        let displaySalaries = () => {
            console.log( "Inside" )
            const phrase = [];
            for ( var key in this.state.salaries ) {
                // skip loop if the property is from prototype
                if ( !this.state.salaries.hasOwnProperty( key ) ) continue;

                var obj = this.state.salaries[ key ];

                console.log( key )
                console.log( obj.min, obj.max )

                phrase.push( IndividualSalary( key, obj ) )

            }
            return phrase
        }

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        return (

            <div className="employer-profile-wrapper">
                {redirectVar }
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={ salaryCover } alt="Cover" />
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

                        </div>
                    </div>
                    <div className="salary-info-wrapper">
                        <p style={ { marginLeft: "1px", fontSize: "30px", lineHeight: "27px", fontWeight: "bold" } }> { localStorage.getItem( "name" ) } Salaries</p>
                        <hr />


                        <div style={ { marginBottom: "3px", overflowY: "auto", height: "500px" } }>
                            { displaySalaries() }

                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default EmployerSalaries




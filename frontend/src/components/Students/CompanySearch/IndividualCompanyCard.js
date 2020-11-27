import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

// import intel_logo from '../../../Images/intel.png'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class IndividualCompanyCard extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            ...this.props.company,
            numOfReviews: 0,
            numOfInterviews: 0,
            numOfSalaries: 0,
            avgRatings: 0,
            redirectToAddContribution: null
        }
    }

    componentDidMount () {
        if ( this.state._id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            let data = {
                firstTime: true,
                pageSize: 5
            }
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + this.state.employerName, data )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        if ( res.data.reviewStats.totalCount ) {
                            this.setState( {
                                numOfReviews: res.data.reviewStats.totalCount
                            } )
                        }
                        if ( res.data.reviewStats.avarageRatings ) {
                            this.setState( {
                                avgRatings: res.data.reviewStats.avarageRatings
                            } )
                        }
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
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getInterviewsByEmployer/" + this.state.employerName, data )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        if ( res.data.interviewStats.totalCount ) {
                            this.setState( {
                                numOfInterviews: res.data.interviewStats.totalCount
                            } )
                        }
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
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getSalariesByEmployer/" + this.state.employerName, data )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        if ( res.data.salaryStats.totalCount ) {
                            this.setState( {
                                numOfSalaries: res.data.salaryStats.totalCount
                            } )
                        }
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

    writeReview = ( e ) => {
        e.preventDefault()
        this.setState( {
            redirectToAddContribution: true
        } )
    }

    render () {
        let redirect = null
        if ( this.state.redirectToAddContribution ) {
            redirect = <Redirect to="/students/addcontribution" />
        }
        return (
            <div className="individual-comanycard-wrapper">
                { redirect }
                <div className="row">
                    <div className="col-2">
                        <img className="company-search-company-logo" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.profileImageUrl } alt="company_logo" />
                    </div>
                    <div className="col-4">
                        <div className="individual-company-right-pane">
                            <div className="individual-company-name">
                                { this.state.name }
                            </div>
                            <div className="individual-company-ratings">
                                { this.state.avgRatings }&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#0CA941" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                                </svg>
                            </div>
                            <div className="individual-company-location">
                                { this.state.city }
                            </div>
                            <div className="individual-company-website">
                                { this.state.website }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row individual-company-stats">
                            <div className="col-4">
                                <div className="individual-company-numbers text-center">
                                    { this.state.numOfReviews }
                                </div>
                                <div className="individual-company-stats-text text-center">
                                    Reviews
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="individual-company-numbers text-center">
                                    { this.state.numOfSalaries }
                                </div>
                                <div className="individual-company-stats-text text-center">
                                    Salaries
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="individual-company-numbers text-center">
                                    { this.state.numOfInterviews }
                                </div>
                                <div className="individual-company-stats-text text-center">
                                    Interviews
                            </div>
                            </div>
                        </div>
                        <div className="row individual-company-add-review">
                            <div className="col-6"></div>
                            <div className="col-6">
                                <button type="button" className="btn reverse-update-proflie" onClick={ this.writeReview }>Add a Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IndividualCompanyCard;
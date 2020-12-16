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
            redirectToAddContribution: null,
            redirectToCompany: false
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
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + this.state.name, data )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( this.state.name, res.data )
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
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getInterviewsByEmployer/" + this.state.name, data )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( this.state.name, res.data )
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
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getSalariesByEmployer/" + this.state.name, data )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( this.state.name, res.data )
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

    redirectToCompany = () => {
        this.setState( {
            redirectToCompany: true
        } )
    }

    render () {
        let redirect = null
        if ( this.state.redirectToAddContribution ) {
            redirect = <Redirect to="/students/addcontribution" />
        }
        if ( this.state.redirectToCompany ) {
            redirect = <Redirect to={ {
                pathname: "/employer/profile",
                state: { employerID: this.state._id }
            } } />
        }
        return (
            <div className="individual-comanycard-wrapper">
                { redirect }
                <div className="row">
                    <div className="col-2">
                        { this.state.profileImageUrl ?
                            <img className="company-search-company-logo" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.logoImageUrl } alt="company_logo" />
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 48 48">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="#0CAA41" fillRule="nonzero" d="M19.182 10h19.636c1.205 0 2.182.895 2.182 2v27H17V12c0-1.105.977-2 2.182-2zM39 37V13a1 1 0 00-1-1H20a1 1 0 00-1 1v24h20z"></path>
                                    <path fill="#DFF7E7" fillRule="nonzero" d="M22 14h14a1 1 0 011 1v20h-4v-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v3h-4V15a1 1 0 011-1z"></path>
                                    <path fill="#0CAA41" fillRule="nonzero" d="M16 19v2h-6a1 1 0 00-1 1v15h7v2H7V21c0-1.105.728-2 1.625-2H16z"></path>
                                    <rect width="4" height="4" x="23" y="16" fill="#0CAA41" rx="2"></rect><rect width="4" height="4" x="23" y="21" fill="#0CAA41" rx="2"></rect>
                                    <rect width="4" height="4" x="31" y="16" fill="#0CAA41" rx="2"></rect><rect width="4" height="4" x="31" y="21" fill="#0CAA41" rx="2"></rect>
                                    <path fill="#0CAA41" stroke="#0CAA41" strokeWidth="2" d="M27 38h4v-6a1 1 0 00-1-1h-2a1 1 0 00-1 1v6z"></path>
                                </g>
                            </svg>
                        }
                    </div>
                    <div className="col-4">
                        <div className="individual-company-right-pane">
                            <div className="individual-company-name" onClick={ this.redirectToCompany }>
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
                        { localStorage.getItem( "active" ) === "students" ?
                            <div className="row individual-company-add-review">
                                <div className="col-6"></div>
                                <div className="col-6">
                                    <button type="button" className="btn reverse-update-proflie" onClick={ this.writeReview }>Add a Review</button>
                                </div>
                            </div>
                            : null }
                    </div>
                </div>
            </div>
        )
    }
}

export default IndividualCompanyCard;
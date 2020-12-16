import React, { Component } from 'react'
import axios from 'axios'

import SEO from '../../../SEO/SEO'
import AddContribution from '../AddContributionHelper'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'
import { Link } from 'react-router-dom'

class Reviews extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            reviews: []
        }
    }

    componentDidMount () {
        SEO( {
            title: "Your Review History | Glassdoor"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyStudent/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        this.setState( {
                            reviews: res.data
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

    deleteReview = ( reviewID ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.delete( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/removeReview/" + reviewID )
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

    render () {
        let contribution = {
            heading: "Reviews",
            add_button: "Write a Review"
        }
        let getDate = ( date ) => {
            let formattedDate = new Date( parseInt( date ) )
            return ( formattedDate.getMonth() + 1 ) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
        }
        return (
            <div className="contributions-right-pane">
                <AddContribution contribution={ contribution } />
                <div className="contributions-text">
                    All reviews you've posted are displayed below.
                </div>
                <div className="all-reviews">
                    <div className="row contributions-stat-heading">
                        <div className="col-4 contributions-stat-column">
                            <strong>Details</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                            <strong>Employee Status</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                            <strong>Submitted</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                            <strong>Review Status</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                        </div>
                    </div>
                    { this.state.reviews ?
                        this.state.reviews.map( ( review, index ) => {
                            return <div className="row contributions-stats" key={ index }>
                                <div className="col-4 contributions-stat-column">
                                    { review.reviewStatus === "Approved" ?

                                        <div>
                                            <Link to={ {
                                                pathname: "/employer/reviews",
                                                state: { employerName: review.employerName, employerID: "" }
                                            } }>
                                                { review.employerName }
                                            </Link>
                                        </div>
                                        :
                                        <div>
                                            { review.employerName }
                                        </div>
                                    }
                                    <div className="review-description">{ review.description.length > 100 ?
                                        "\"" + review.description.substring( 0, 100 ) + "...\""
                                        : "\"" + review.description + "\""
                                    }</div>
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    { review.employeeStatus }
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    { review.reviewDate ?
                                        getDate( review.reviewDate )
                                        : null }
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    { review.reviewStatus }
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    <span className="contribution-delete-option" onClick={ () => this.deleteReview( review._id ) }>Delete</span>
                                </div>
                            </div>
                        } )
                        : null
                    }

                </div>
            </div>
        )
    }
}

export default Reviews;
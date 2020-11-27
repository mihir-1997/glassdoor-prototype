import React, { Component } from 'react'
import axios from 'axios'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class IndividualJobCard extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            avgRatings: 0,
            ...this.props.jobDetails
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
                        if ( res.data.reviewStats.avarageRatings ) {
                            this.setState( {
                                avgRatings: res.data.reviewStats.avarageRatings
                            }, () => {
                                this.props.saveAvgRatings( this.state._id, this.state.avgRatings )
                            } )
                        } else {
                            this.props.saveAvgRatings( this.state._id, this.state.avgRatings )
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

    showJobDescription = () => {
        this.props.showJobDescription( { ...this.state } )
    }

    render () {
        let getDate = ( date ) => {
            let formattedDate = new Date( date )
            return ( formattedDate.getMonth() + 1 ) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
        }
        return (
            <div>
                <div className="clear-float" >
                    <div id={ this.state._id } className="each-job" onClick={ this.showJobDescription }>
                        <div className="each-job-left-pane left-pane">
                            <div className="each-job-company-logo">
                                <div className="company-logo-wrapper">
                                    {/* <img className="company-logo" src={ intel_logo } alt="company_logo" /> */ }
                                </div>
                            </div>
                            <div className="each-job-company-ratings">
                                <span>
                                    { this.state.avgRatings }
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                        <path fill="#0CA941" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="each-job-right-pane right-pane">
                            <div className="each-job-company-name">
                                { this.state.employerName }
                            </div>
                            <div className="each-job-title">
                                { this.state.title }
                            </div>
                            <div className="each-job-location">
                                { this.state.city }, { this.state.state }
                            </div>
                            <div className="each-job-salary">
                                { this.state.salary ?
                                    <span>${ this.state.salary }</span>
                                    : null }
                            </div>
                            <div className="each-job-date-wrapper">
                                <div className="each-job-date">
                                    { this.state.date ?
                                        getDate( this.state.date )
                                        : null }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IndividualJobCard;
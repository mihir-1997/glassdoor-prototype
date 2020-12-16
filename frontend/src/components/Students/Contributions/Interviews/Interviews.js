import React, { Component } from 'react'
import axios from 'axios'

import SEO from '../../../SEO/SEO'
import AddContribution from '../AddContributionHelper';

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class Interviews extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            interviews: []
        }
    }

    componentDidMount () {
        SEO( {
            title: "Your Interview History | Glassdoor"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getInterviewsbyStudent/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        this.setState( {
                            interviews: res.data
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

    deleteInterview = ( interviewID ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.delete( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/removeInterview/" + interviewID )
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
            heading: "Interviews",
            add_button: "Share an Interview"
        }
        let getDate = ( date ) => {
            let formattedDate = new Date( parseInt( date ) )
            return ( formattedDate.getMonth() + 1 ) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
        }
        return (
            <div className="contributions-right-pane">
                <AddContribution contribution={ contribution } />
                <div className="contributions-text">
                    All interviews you've posted are displayed below.
                </div>
                <div className="all-interviews">
                    <div className="row contributions-stat-heading">
                        <div className="col-5 contributions-stat-column">
                            <strong>Details</strong>
                        </div>
                        <div className="col-3 contributions-stat-column">
                            <strong>Offer Status</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                            <strong>Submitted</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                        </div>
                    </div>
                    { this.state.interviews ?
                        this.state.interviews.map( ( interview, index ) => {
                            return <div className="row contributions-stats" key={ index }>
                                <div className="col-5 contributions-stat-column">
                                    <div><a href="fake/path">{ interview.employerName }</a></div>
                                    <div className="interview-description">{ interview.description.length > 100 ?
                                        interview.description.substring( 0, 100 )
                                        : interview.description
                                    }</div>
                                </div>
                                <div className="col-3 contributions-stat-column">
                                    { interview.offerStatus }
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    { getDate( interview.interviewDate ) }
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    <span className="contribution-delete-option" onClick={ () => this.deleteInterview( interview._id ) }>Delete</span>
                                </div>
                            </div>
                        } )
                        : null }
                </div>
            </div>
        )
    }
}

export default Interviews;
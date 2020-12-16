import React, { Component } from 'react'
import axios from 'axios'

import SEO from '../../../SEO/SEO'
import AddContribution from '../AddContributionHelper'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class Salaries extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            salaries: []
        }
    }

    componentDidMount () {
        SEO( {
            title: "Your Salary History | Glassdoor"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getSalariesbyStudent/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        this.setState( {
                            salaries: res.data
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

    deleteSalary = ( salaryID ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.delete( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/removeSalary/" + salaryID )
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
            heading: "Salaries",
            add_button: "Add a Salary"
        }
        let getDate = ( date ) => {
            let formattedDate = new Date( parseInt( date ) )
            return ( formattedDate.getMonth() + 1 ) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
        }
        return (
            <div className="contributions-right-pane">
                <AddContribution contribution={ contribution } />
                <div className="contributions-text">
                    All salaries you've posted are displayed below.
                </div>
                <div className="all-salaries">
                    <div className="row contributions-stat-heading">
                        <div className="col-6 contributions-stat-column">
                            <strong>Details</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                            <strong>Employee Status</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                            <strong>Submitted</strong>
                        </div>
                        <div className="col-2 contributions-stat-column">
                        </div>
                    </div>
                    { this.state.salaries ?
                        this.state.salaries.map( ( salary, index ) => {
                            return <div className="row contributions-stats" key={ index }>
                                <div className="col-6 contributions-stat-column">
                                    <strong>{ salary.jobTitle }</strong> in { salary.location } at { salary.employerName }
                                    <br /> ${ salary.baseSalary } yearly
                        </div>
                                <div className="col-2 contributions-stat-column">
                                    { salary.employeeStatus }
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    { getDate( salary.salaryDate ) }
                                </div>
                                <div className="col-2 contributions-stat-column">
                                    <span className="contribution-delete-option" onClick={ () => this.deleteSalary( salary._id ) }>Delete</span>
                                </div>
                            </div>
                        } )
                        : null }
                </div>
            </div>
        )
    }
}

export default Salaries;
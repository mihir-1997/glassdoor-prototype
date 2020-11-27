import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

import './CompanySearch.css'
import IndividualCompanyCard from './IndividualCompanyCard'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class CompanySearch extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            allCompanies: [],
            searchTerm: this.props.location.state ? this.props.location.state.searchTerm : "",
            currPage: 1,
            eachPageSize: 10
        }
    }

    componentDidMount () {
        if ( this.props.location.state.searchTerm ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/employers/getEmployerByName/" + this.props.location.state.searchTerm )
                    .then( ( res ) => {
                        if ( res.status === 200 ) {
                            console.log( res.data )
                            if ( res.data.length > 0 ) {
                                this.setState( {
                                    allCompanies: res.data
                                } )
                            } else if ( res.data ) {
                                let data = []
                                data.push( res.data )
                                this.setState( {
                                    allCompanies: data
                                } )
                            } else {
                                this.setState( {
                                    allCompanies: []
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
    }

    componentDidUpdate ( prevProps ) {
        if ( prevProps.location.state.searchTerm !== this.props.location.state.searchTerm ) {
            this.componentDidMount()
        }
    }

    render () {
        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        return (
            <div className="company-search-wrapper" key={ Math.random() }>
                {redirectVar }
                <div className="company-result-text-wrapper">
                    <div className="company-result-text">Showing results for <strong>{ this.props.location.state.searchTerm }</strong></div>
                </div>
                {this.state.allCompanies.length > 0 ?
                    this.state.allCompanies.map( ( company, index ) => {
                        return <IndividualCompanyCard company={ company } key={ index } />
                    } )
                    : null }
            </div>
        )
    }
}

export default CompanySearch;
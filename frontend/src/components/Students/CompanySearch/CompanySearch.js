import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './CompanySearch.css'
import IndividualCompanyCard from './IndividualCompanyCard'

class CompanySearch extends Component {
    render () {
        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        return (
            <div className="company-search-wrapper">
                {redirectVar }
                <div className="company-result-text-wrapper">
                    <div className="company-result-text">Showing results for <strong>Intel</strong></div>
                    {/* <div>Showing results for <strong>{this.state.search}</strong></div> */ }
                </div>
                <IndividualCompanyCard />
            </div>
        )
    }
}

export default CompanySearch;
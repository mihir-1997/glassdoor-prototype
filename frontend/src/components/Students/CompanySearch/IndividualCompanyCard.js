import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import intel_logo from '../../../Images/intel.png'

class IndividualCompanyCard extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            redirectToAddContribution: null
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
                        <img className="company-search-company-logo" src={ intel_logo } alt="company_logo" />
                    </div>
                    <div className="col-4">
                        <div className="individual-company-right-pane">
                            <div className="individual-company-name">
                                Intel Corporation
                                {/* { this.state.company_name } */ }
                            </div>
                            <div className="individual-company-ratings">
                                4.1&nbsp;&nbsp;
                                {/* {this.state..avg_ratings} */ }
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#0CA941" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                                </svg>
                            </div>
                            <div className="individual-company-location">
                                Santa Clara, CA
                                {/* {this.state.location} */ }
                            </div>
                            <div className="individual-company-website">
                                www.intel.com
                                {/* {this.state.website} */ }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row individual-company-stats">
                            <div className="col-4">
                                <div className="individual-company-numbers text-center">
                                    16k
                                    {/* {this.state.total_reviews} */ }
                                </div>
                                <div className="individual-company-stats-text text-center">
                                    Reviews
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="individual-company-numbers text-center">
                                    38k
                                    {/* {this.state.total_salaries} */ }
                                </div>
                                <div className="individual-company-stats-text text-center">
                                    Salaries
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="individual-company-numbers text-center">
                                    4.2k
                                    {/* {this.state.total_interviews} */ }
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
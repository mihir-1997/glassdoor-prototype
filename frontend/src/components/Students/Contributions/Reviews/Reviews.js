import React, { Component } from 'react'

import SEO from '../../../SEO/SEO'
import AddContribution from '../AddContributionHelper'

class Reviews extends Component {

    componentDidMount () {
        SEO( {
            title: "Your Review History | Glassdoor"
        } )
    }

    render () {
        let contribution = {
            heading: "Reviews",
            add_button: "Write a Review"
        }
        return (
            <div className="contributions-right-pane">
                <AddContribution contribution={ contribution } />
                <div className="contributions-text">
                    All reviews you've posted are displayed below.
                </div>
                <div className="all-reviews">
                    <div className="row contributions-stat-heading">
                        <div className="col-3 contributions-stat-column">
                            <strong>Details</strong>
                        </div>
                        <div className="col-3 contributions-stat-column">
                            <strong>Employee Status</strong>
                        </div>
                        <div className="col-3 contributions-stat-column">
                            <strong>Submitted</strong>
                        </div>
                        <div className="col-3 contributions-stat-column">
                            <strong>Review Status</strong>
                        </div>
                    </div>
                    <div className="row contributions-stats">
                        <div className="col-3 contributions-stat-column">
                            Nice
                            {/* {review_text} */ }
                        </div>
                        <div className="col-3 contributions-stat-column">
                            Former
                            {/* {employee_status} */ }
                        </div>
                        <div className="col-3 contributions-stat-column">
                            Nov 13, 2020
                            {/* {date} */ }
                        </div>
                        <div className="col-3 contributions-stat-column">
                            Pending
                            {/* {review_status} */ }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;
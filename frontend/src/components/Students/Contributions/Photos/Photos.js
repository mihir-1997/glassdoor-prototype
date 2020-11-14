import React, { Component } from 'react'

import SEO from '../../../SEO/SEO'
import AddContribution from '../AddContributionHelper';

class Photos extends Component {

    componentDidMount () {
        SEO( {
            title: "Your Photo History | Glassdoor"
        } )
    }

    render () {
        let contribution = {
            heading: "Photos",
            add_button: "Add Photos"
        }
        return (
            <div className="contributions-right-pane">
                <AddContribution contribution={ contribution } />
                <div className="contributions-text">
                    All photos you've posted are displayed below.
                </div>
                <div className="all-interviews">
                    <div className="row contributions-stat-heading">
                        <div className="col-5 contributions-stat-column">
                            <strong>Details</strong>
                        </div>
                        <div className="col-3 contributions-stat-column">
                            <strong>Submitted</strong>
                        </div>
                        <div className="col-4 contributions-stat-column">
                            <strong>Status</strong>
                        </div>
                    </div>
                    <div className="row contributions-stats">
                        <div className="col-5 contributions-stat-column">
                            Photo
                            {/* {review_text} */ }
                        </div>
                        <div className="col-3 contributions-stat-column">
                            Nov 13, 2020
                            {/* {date} */ }
                        </div>
                        <div className="col-4 contributions-stat-column">
                            Pending
                            {/* {review_status} */ }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Photos;
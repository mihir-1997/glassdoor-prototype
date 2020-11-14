import React, { Component } from 'react'

import SEO from '../../../SEO/SEO'
import AddContribution from '../AddContributionHelper'

class Salaries extends Component {

    componentDidMount () {
        SEO( {
            title: "Your Salary History | Glassdoor"
        } )
    }

    render () {
        let contribution = {
            heading: "Salaries",
            add_button: "Add a Salary"
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
                        <div className="col-3 contributions-stat-column">
                            <strong>Employee Status</strong>
                        </div>
                        <div className="col-3 contributions-stat-column">
                            <strong>Submitted</strong>
                        </div>
                    </div>
                    <div className="row contributions-stats">
                        <div className="col-6 contributions-stat-column">
                            <strong>Devops</strong> in San Francisco, CA at FortressIQ
                            <br /> $25 hourly
                            {/* {title} in {location} at {company} */ }
                        </div>
                        <div className="col-3 contributions-stat-column">
                            Former
                            {/* {employee_status} */ }
                        </div>
                        <div className="col-3 contributions-stat-column">
                            Nov 13, 2020
                            {/* {date} */ }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Salaries;
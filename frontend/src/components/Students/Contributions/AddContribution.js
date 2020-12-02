import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './AddContribution.css'
import SEO from '../../SEO/SEO'
import AddSalary from './Salaries/AddSalary'
import AddReview from './Reviews/AddReview'
import AddInterview from './Interviews/AddInterview'
import AddPhotos from './Photos/AddPhotos'

class AddContribution extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            activeRadio: "company-review"
        }
    }

    componentDidMount () {
        SEO( {
            title: "Glassdoor - Get Hired. Love your job | Glassdoor"
        } )
    }

    radioChange = ( e ) => {
        this.setState( {
            activeRadio: e.target.value
        } )
    }

    addPhotos = () => {

    }

    render () {
        let activeSection = null
        if ( this.state.activeRadio === "salary" ) {
            activeSection = <AddSalary />
        } else if ( this.state.activeRadio === "company-review" ) {
            activeSection = <AddReview />
        } else if ( this.state.activeRadio === "interview-review" ) {
            activeSection = <AddInterview />
        } else if ( this.state.activeRadio === "workday-photo" ) {
            activeSection = <AddPhotos />
        }
        let redirectVar = null
        if ( localStorage.getItem( "active" ) !== "students" ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        return (
            <div>
                { redirectVar }
                <div className="contributions-wrapper">
                    <div className="row">
                        <div className="col-8">
                            <div className="add-contribution-wrapper">
                                <div className="add-contrihution-header">
                                    <span>What would you like to contribute?</span>
                                </div>
                                <div className="add-contribution-static-text">
                                    <span>Everything you add helps others find a job and company they'll love. Thanks!</span>
                                </div>
                                <div className="add-contribution-options">
                                    <div className="row">
                                        <div className="col-4">
                                            <strong>Add your anonymous...</strong>
                                        </div>
                                        <div className="col-8">
                                            <div onChange={ this.radioChange }>
                                                <input type="radio" id="company-review" name="addContributionOption" value="company-review" defaultChecked={ this.state.activeRadio === "company-review" } />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label htmlFor="company review">Company Review</label><br />
                                                <input type="radio" id="salary" name="addContributionOption" value="salary" defaultChecked={ this.state.activeRadio === "salary" } />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label htmlFor="salary">Salary</label><br />
                                                <input type="radio" id="interview-review" name="addContributionOption" value="interview-review" defaultChecked={ this.state.activeRadio === "interview-review" } />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label htmlFor="interview review">Interview Review</label><br />
                                                <input type="radio" id="workday-photo" name="addContributionOption" value="workday-photo" defaultChecked={ this.state.activeRadio === "workday-photo" } />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label htmlFor="workday photo">Workday Photos</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-contribution-active-section">
                                    { activeSection }
                                </div>

                            </div>
                        </div>
                        <div className="col-4">
                            <div className="add-contribution-right-pane">
                                <h5>Millions of people like you have contributed to Glassdoor.</h5>
                                <div className="each-line">
                                    There is no other site like Glassdoor. The reviews and salaries are invaluable to anyone looking to accelerate their career.
                                    <br />- Rich M.
                                </div>
                                <div className="each-line">
                                    Glassdoor has helped me negotiate my salary and make sure I'm getting paid fairly.
                                    <br />– Bijal A.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddContribution;
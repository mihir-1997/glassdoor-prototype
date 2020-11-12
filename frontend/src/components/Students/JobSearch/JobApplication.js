import React, { Component } from 'react'

import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'
import SEO from '../../SEO/SEO'

class JobApplication extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            resume: "",
            phoneNo: "",
            address: "",
            city: "",
            state: "",
            postal: ""
        }
    }

    componentDidMount () {
        SEO( {
            title: "Jobs"
        } )
    }

    onChange = ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    closePopup = () => {
        let popup = document.getElementById( "job-application-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    applyToJob = () => {

    }

    render () {
        return (
            <div>
                <div id="job-application-popup" className="popup-container">
                    <div className="popup-wrapper">
                        <Header closePopup={ this.closePopup } headerText="Intel" />
                        {/* <Header closePopup={ this.closePopup } headerText={job.company_name} /> */ }
                        <div className="popup-body">
                            <form className="popup-form">
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentFirstName">First Name</label>
                                        <input type="text" className="form-control" id="jobStudentFirstName" placeholder="First Name" name="firstName" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentLastName">Last Name</label>
                                        <input type="text" className="form-control" id="jobStudentLastName" placeholder="Last Name" name="lastName" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="JobStudentEmail">Email</label>
                                        <input type="text" className="form-control" id="JobStudentEmail" placeholder="Email" name="email" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentResume">Select Resume</label>
                                        <input type="text" className="form-control" id="jobStudentResume" placeholder="Select Resume" name="resume" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentPhone">Phone No</label>
                                        <input type="text" className="form-control" id="jobStudentPhone" placeholder="Phone No" name="phoneNo" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentAddress">Address</label>
                                        <input type="text" className="form-control" id="jobStudentAddress" placeholder="Address" name="address" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentCity">City</label>
                                        <input type="text" className="form-control" id="jobStudentCity" placeholder="City" name="city" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentState">State</label>
                                        <input type="text" className="form-control" id="jobStudentState" placeholder="State" name="state" onChange={ this.onChange } />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="jobStudentPostal">Postal</label>
                                        <input type="text" className="form-control" id="jobStudentPostal" placeholder="Postal" name="postal" onChange={ this.onChange } />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Footer closePopup={ this.closePopup } saveChanges={ this.applyToJob } buttonName="Apply" />
                    </div>
                </div>
            </div>
        )
    }
}

export default JobApplication;
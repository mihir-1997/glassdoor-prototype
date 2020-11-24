import React, { Component } from 'react'

import './EmployerJobs.css'
import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'

class AddJob extends Component {


    closePopup = () => {
        let popup = document.getElementById( "add-job-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    addJob = () => {

    }

    render () {


        return (
            <div id="add-job-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Add Jobs
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Company Name</label>
                                    <input type="text" className="form-control"  placeholder="Company Name" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Job Title</label>
                                    <input type="text" className="form-control"  placeholder="Job Title" />
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <label htmlFor="experienceInputCompanyName">Address</label>
                                    <input type="text" className="form-control" id="experienceInputCompanyName" placeholder="Address" />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="experienceInputCompanyName">Industry</label>
                                    <input type="text" className="form-control" id="experienceInputCompanyName" placeholder="Industry" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">City</label>
                                    <input type="text" className="form-control"  placeholder="City" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">State</label>
                                    <input type="text" className="form-control"  placeholder="State" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Country</label>
                                    <input type="text" className="form-control"  placeholder="Country" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Zip</label>
                                    <input type="text" className="form-control"  placeholder="Zip" />
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputTitle">Description</label>
                                    <textarea type="text" className="form-control"  placeholder="Description" />
                                </div>

                            </div>
                            <div className="form-row">

                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputTitle">Qualifications</label>
                                    <input type="text-area" className="form-control"  placeholder="Qualifications" />
                                </div>
                            </div>
                        
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveProfile } />
                </div>
            </div>
        )
    }
}

export default AddJob;
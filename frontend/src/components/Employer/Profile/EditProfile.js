import React, { Component } from 'react'

import './EmployerProfile.css'
import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'

class EditProfile extends Component {

    closePopup = () => {
        let popup = document.getElementById( "edit-profile-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveProfile = () => {

    }

    render () {

        return (
            <div id="edit-profile-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Edit Employer Profile
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Name</label>
                                    <input type="text" className="form-control"  placeholder="Name" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Website</label>
                                    <input type="text" className="form-control"  placeholder="Website" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputCompanyName">Address</label>
                                    <input type="text" className="form-control" id="experienceInputCompanyName" placeholder="Address" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Company Size</label>
                                    <input type="text" className="form-control"  placeholder="Company Size" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Company Type</label>
                                    <input type="text" className="form-control"  placeholder="Company Type" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Revenue</label>
                                    <input type="text" className="form-control"  placeholder="Revenue" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Founded</label>
                                    <input type="text" className="form-control"  placeholder="Founded" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="experienceInputTitle">Headquarters</label>
                                    <input type="text" className="form-control"  placeholder="Headquarters" />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="experienceInputTitle">CEO Name</label>
                                    <input type="text" className="form-control"  placeholder="CEO Name" />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="experienceInputTitle">Industry</label>
                                    <input type="text" className="form-control"  placeholder="Industry" />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputDescription">Mission</label>
                                    <textarea type="text" className="form-control" id="experienceInputDescription" placeholder="Mission" />
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

export default EditProfile;
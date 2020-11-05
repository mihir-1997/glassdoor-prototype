import React, { Component } from 'react'

import './Education.css'
import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class AddEducation extends Component {

    changeStartMonth = ( e ) => {
        console.log( e.target.value )
    }

    changeEndMonth = ( e ) => {
        console.log( e.target.value )
    }

    degreeChange = ( e ) => {
        console.log( e.target.value )
    }

    closePopup = () => {
        let popup = document.getElementById( "education-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveEducation = () => {

    }

    render () {

        let selectMonth = ( label, onChange ) => {
            return <select className="custom-select" id={ label } onChange={ onChange }>
                <option value=""></option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
            </select>
        }

        return (
            <div id="education-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Add Education
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputSchool">School</label>
                                    <input type="text" className="form-control" id="educationInputSchool" placeholder="School" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputDegree">Degree / Certificate</label>
                                    <select className="custom-select" id="educationInputDegree" onChange={ this.degreeChange }>
                                        <option value="">Select your option</option>
                                        <option value="High School">High School Diploma</option>
                                        <option value="Associate">Associate's Degree</option>
                                        <option value="Bachelor">Bachelor's Degree</option>
                                        <option value="Master">Master's Degree</option>
                                        <option value="MBA">MBA</option>
                                        <option value="JD">JD</option>
                                        <option value="MD">MD</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputStudy">Field of Study</label>
                                    <input type="text" className="form-control" id="educationInputStudy" placeholder="Field of Study" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputLocation">Location</label>
                                    <input type="text" className="form-control" id="educationInputLocation" placeholder="Location" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="educationInputStartMonth">Start Month</label>
                                    { selectMonth( "educationInputStartMonth", this.changeStartMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="educationInputStartYear">Start Year</label>
                                    <input type="number" className="form-control" id="educationInputStartYear" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="educationInputEndMonth">End Month</label>
                                    { selectMonth( "educationInputEndMonth", this.changeEndMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="educationInputEndYear">End Year</label>
                                    <input type="number" className="form-control" id="educationInputEndYear" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputDescription">Description</label>
                                    <textarea type="text" className="form-control" id="educationInputDescription" placeholder="Description" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveEducation } />
                </div>
            </div>
        )
    }
}

export default AddEducation;
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
                                    <label htmlFor="inputSchool">School</label>
                                    <input type="text" className="form-control" id="inputSchool" placeholder="School" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="inputDegree">Degree / Certificate</label>
                                    <select className="custom-select" id="inputDegree" onChange={ this.degreeChange }>
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
                                    <label htmlFor="inputStudy">Field of Study</label>
                                    <input type="text" className="form-control" id="inputStudy" placeholder="Field of Study" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="inputLocation">Location</label>
                                    <input type="text" className="form-control" id="inputLocation" placeholder="Location" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputStartMonth">Start Month</label>
                                    { selectMonth( "inputStartMonth", this.changeStartMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputStartYear">Start Year</label>
                                    <input type="number" className="form-control" id="inputStartYear" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEndMonth">End Month</label>
                                    { selectMonth( "inputEndMonth", this.changeEndMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputEndYear">End Year</label>
                                    <input type="number" className="form-control" id="inputEndYear" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="inputDescription">Description</label>
                                    <textarea type="text" className="form-control" id="inputDescription" placeholder="Description" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveEducation={ this.saveEducation } />
                </div>
            </div>
        )
    }
}

export default AddEducation;
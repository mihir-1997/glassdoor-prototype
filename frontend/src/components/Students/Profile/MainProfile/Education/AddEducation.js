import React, { Component } from 'react'

import './Education.css'
import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class AddEducation extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            collegeName: "",
            degree: "",
            major: "",
            collegeLocation: "",
            collegeStartMonth: "",
            collegeStartYear: "",
            collegeEndMonth: "",
            collegeEndYear: "",
            collegeDescription: "",
            error: ""
        }
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    changeStartMonth = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            collegeStartMonth: e.target.value
        } )
    }

    changeEndMonth = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            collegeEndMonth: e.target.value
        } )
    }

    degreeChange = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            degree: e.target.value
        } )
    }

    closePopup = () => {
        let popup = document.getElementById( "education-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveEducation = () => {
        if ( this.state.collegeName && this.state.degree ) {
            let education = {
                collegeName: this.state.collegeName,
                degree: this.state.degree,
                major: this.state.major,
                collegeLocation: this.state.collegeLocation,
                collegeStartDate: this.state.collegeStartMonth + " " + this.state.collegeStartYear,
                collegeEndDate: this.state.collegeEndMonth + " " + this.state.collegeEndYear,
                collegeDescription: this.state.collegeDescription,
            }
            this.props.saveEducation( education )
        } else {
            this.setState( {
                error: "Some of the required fields are missing"
            } )
        }
    }

    render () {

        let selectMonth = ( label, name, value, onChange ) => {
            return <select className="custom-select" name={ name } id={ label } value={ value } onChange={ onChange }>
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
                                    <label htmlFor="educationInputSchool">School*</label>
                                    <input type="text" name="collegeName" className="form-control" id="educationInputSchool" placeholder="School" value={ this.state.collegeName } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputDegree">Degree / Certificate*</label>
                                    <select className="custom-select" id="educationInputDegree" value={ this.state.degree } onChange={ this.degreeChange }>
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
                                    <input type="text" name="major" className="form-control" id="educationInputStudy" placeholder="Field of Study" value={ this.state.major } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputLocation">Location</label>
                                    <input type="text" name="collegeLocation" className="form-control" id="educationInputLocation" placeholder="Location" value={ this.state.collegeLocation } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="educationInputStartMonth">Start Month</label>
                                    { selectMonth( "educationInputStartMonth", "collegeStartMonth", this.state.collegeStartMonth, this.changeStartMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="educationInputStartYear">Start Year</label>
                                    <input type="number" name="collegeStartYear" className="form-control" id="educationInputStartYear" value={ this.state.collegeStartYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="educationInputEndMonth">End Month</label>
                                    { selectMonth( "educationInputEndMonth", "collegeEndMonth", this.state.collegeEndMonth, this.changeEndMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="educationInputEndYear">End Year</label>
                                    <input type="number" name="collegeEndYear" className="form-control" id="educationInputEndYear" value={ this.state.collegeEndYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputDescription">Description</label>
                                    <textarea type="text" name="collegeDescription" className="form-control" id="educationInputDescription" placeholder="Description" value={ this.state.collegeDescription } onChange={ this.onChange } />
                                </div>
                            </div>
                        </form>
                        <div className="error">
                            { this.state.error }
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveEducation } />
                </div>
            </div>
        )
    }
}

export default AddEducation;
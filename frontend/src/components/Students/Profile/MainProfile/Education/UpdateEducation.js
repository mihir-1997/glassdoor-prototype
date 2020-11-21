import React, { Component } from 'react'

import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class UpdateEducation extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            educationID: "",
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

    componentDidMount () {
        let startMonth = ""
        let startYear = ""
        let endMonth = ""
        let endYear = ""
        if ( this.props.education.collegeStartDate ) {
            if ( /\s/.test( this.props.education.collegeStartDate ) ) {
                startMonth = this.props.education.collegeStartDate.split( " " )[ 0 ]
                startYear = this.props.education.collegeStartDate.split( " " )[ 1 ]
            } else {
                startMonth = this.props.education.collegeStartDate
            }
        }
        if ( this.props.education.collegeEndDate ) {
            if ( /\s/.test( this.props.education.collegeEndDate ) ) {
                endMonth = this.props.education.collegeEndDate.split( " " )[ 0 ]
                endYear = this.props.education.collegeEndDate.split( " " )[ 1 ]
            } else {
                endMonth = this.props.education.collegeEndDate
            }
        }
        this.setState( {
            educationID: this.props.education.educationID,
            collegeName: this.props.education.collegeName,
            degree: this.props.education.degree,
            major: this.props.education.major,
            collegeLocation: this.props.education.collegeLocation,
            collegeStartMonth: startMonth,
            collegeStartYear: startYear,
            collegeEndMonth: endMonth,
            collegeEndYear: endYear,
            collegeDescription: this.props.education.collegeDescription,
        } )
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
        let popup = document.getElementById( "update-education-popup-" + this.props.index )
        popup.classList.remove( "popup-wrapper-show" )
    }

    updateEducation = () => {
        if ( this.state.collegeName && this.state.degree ) {
            let education = {
                educationID: this.state.educationID,
                collegeName: this.state.collegeName,
                degree: this.state.degree,
                major: this.state.major,
                collegeLocation: this.state.collegeLocation,
                collegeStartDate: this.state.collegeStartMonth + " " + this.state.collegeStartYear,
                collegeEndDate: this.state.collegeEndMonth + " " + this.state.collegeEndYear,
                collegeDescription: this.state.collegeDescription,
            }
            this.props.updateEducation( education )
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
            <div id={ "update-education-popup-" + this.props.index } className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Update Education
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputSchool">School*</label>
                                    <input type="text" name="collegeName" className="form-control" id={ "educationInputSchool" + this.props.index } placeholder="School" value={ this.state.collegeName } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputDegree">Degree / Certificate*</label>
                                    <select className="custom-select" id={ "educationInputDegree" + this.props.index } value={ this.state.degree } onChange={ this.degreeChange }>
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
                                    <input type="text" name="major" className="form-control" id={ "educationInputStudy" + this.props.index } placeholder="Field of Study" value={ this.state.major } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputLocation">Location</label>
                                    <input type="text" name="collegeLocation" className="form-control" id={ "educationInputLocation" + this.props.index } placeholder="Location" value={ this.state.collegeLocation } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="educationInputStartMonth">Start Month</label>
                                    { selectMonth( "educationInputStartMonth" + this.props.index, "collegeStartMonth", this.state.collegeStartMonth, this.changeStartMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="educationInputStartYear">Start Year</label>
                                    <input type="number" name="collegeStartYear" className="form-control" id={ "educationInputStartYear" + this.props.index } value={ this.state.collegeStartYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="educationInputEndMonth">End Month</label>
                                    { selectMonth( "educationInputEndMonth" + this.props.index, "collegeEndMonth", this.state.collegeEndMonth, this.changeEndMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="educationInputEndYear">End Year</label>
                                    <input type="number" name="collegeEndYear" className="form-control" id={ "educationInputEndYear" + this.props.index } value={ this.state.collegeEndYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="educationInputDescription">Description</label>
                                    <textarea type="text" name="collegeDescription" className="form-control" id={ "educationInputDescription" + this.props.index } placeholder="Description" value={ this.state.collegeDescription } onChange={ this.onChange } />
                                </div>
                            </div>
                        </form>
                        <div className="error">
                            { this.state.error }
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.updateEducation } />
                </div>
            </div>
        )
    }
}

export default UpdateEducation;
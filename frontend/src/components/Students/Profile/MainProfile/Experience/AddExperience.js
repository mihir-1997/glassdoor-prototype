import React, { Component } from 'react'

import './Experience.css'
import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class AddExperience extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            experienceID: "",
            companyName: "",
            jobTitle: "",
            jobStartMonth: "",
            jobStartYear: "",
            jobEndMonth: "",
            jobEndYear: "",
            jobLocation: "",
            jobDescription: "",
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
            jobStartMonth: e.target.value
        } )
    }

    changeEndMonth = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            jobEndMonth: e.target.value
        } )
    }

    closePopup = () => {
        let popup = document.getElementById( "experience-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveExperience = () => {
        if ( this.state.jobTitle && this.state.companyName && this.state.jobStartMonth && this.state.jobStartYear ) {
            let experience = {
                companyName: this.state.companyName,
                jobTitle: this.state.jobTitle,
                jobStartDate: this.state.jobStartMonth + " " + this.state.jobStartYear,
                jobEndDate: this.state.jobEndMonth + " " + this.state.jobEndYear,
                jobLocation: this.state.jobLocation,
                jobDescription: this.state.jobDescription
            }
            this.props.saveExperience( experience )
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
            <div id="experience-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Add Experience
                        </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="addExperienceInputTitle">Title*</label>
                                    <input type="text" name="jobTitle" className="form-control" id="addExperienceInputTitle" placeholder="Title" value={ this.state.jobTitle } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="addExperienceInputCompanyName">Company Name*</label>
                                    <input type="text" name="companyName" className="form-control" id="addExperienceInputCompanyName" placeholder="Company Name" value={ this.state.companyName } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="addExperienceInputLocation">Location</label>
                                    <input type="text" name="jobLocation" className="form-control" id="addExperienceInputLocation" placeholder="Location" value={ this.state.jobLocation } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="addExperienceInputStartMonth">Start Month*</label>
                                    { selectMonth( "addExperienceInputStartMonth", "jobStartMonth", this.state.jobStartMonth, this.changeStartMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="addExperienceInputStartYear">Start Year*</label>
                                    <input type="number" name="jobStartYear" className="form-control" id="addExperienceInputStartYear" value={ this.state.jobStartYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="addExperienceInputEndMonth">End Month</label>
                                    { selectMonth( "addExperienceInputEndMonth", "jobEndMonth", this.state.jobEndMonth, this.changeEndMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="addExperienceInputEndYear">End Year</label>
                                    <input type="number" name="jobEndYear" className="form-control" id="addExperienceInputEndYear" value={ this.state.jobEndYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="addExperienceInputDescription">Description</label>
                                    <textarea type="text" name="jobDescription" className="form-control" id="addExperienceInputDescription" placeholder="Description" value={ this.state.jobDescription } onChange={ this.onChange } />
                                </div>
                            </div>
                        </form>
                        <div className="error">
                            { this.state.error }
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveExperience } />
                </div>
            </div>
        )
    }
}

export default AddExperience;
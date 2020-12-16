import React, { Component } from 'react'

import Footer from '../../../../Popup/Footer'
import Header from '../../../../Popup/Header'

class UpdateExperience extends Component {

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

    componentDidMount () {
        let startMonth = ""
        let startYear = ""
        let endMonth = ""
        let endYear = ""
        if ( this.props.experience.jobStartDate ) {
            if ( /\s/.test( this.props.experience.jobStartDate ) ) {
                startMonth = this.props.experience.jobStartDate.split( " " )[ 0 ]
                startYear = this.props.experience.jobStartDate.split( " " )[ 1 ]
            } else {
                startMonth = this.props.experience.jobStartDate
            }
        }
        if ( this.props.experience.jobStartDate ) {
            if ( /\s/.test( this.props.experience.jobEndDate ) ) {
                endMonth = this.props.experience.jobEndDate.split( " " )[ 0 ]
                endYear = this.props.experience.jobEndDate.split( " " )[ 1 ]
            } else {
                endMonth = this.props.experience.jobEndDate
            }
        }
        this.setState( {
            experienceID: this.props.experience.experienceID,
            companyName: this.props.experience.companyName,
            jobTitle: this.props.experience.jobTitle,
            jobStartMonth: startMonth,
            jobStartYear: startYear,
            jobEndMonth: endMonth,
            jobEndYear: endYear,
            jobLocation: this.props.experience.jobLocation,
            jobDescription: this.props.experience.jobDescription
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
        console.log( "close popup update experience" )
        let popup = document.getElementById( "update-experience-popup-" + this.props.index )
        popup.classList.remove( "popup-wrapper-show" )
    }

    updateExperience = ( e ) => {
        if ( this.state.jobTitle && this.state.companyName && this.state.jobStartMonth && this.state.jobStartYear ) {
            let experience = {
                experienceID: this.state.experienceID,
                companyName: this.state.companyName,
                jobTitle: this.state.jobTitle,
                jobStartDate: this.state.jobStartMonth + " " + this.state.jobStartYear,
                jobEndDate: this.state.jobEndMonth + " " + this.state.jobEndYear,
                jobLocation: this.state.jobLocation,
                jobDescription: this.state.jobDescription
            }
            this.props.updateExperience( experience )
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
            <div id={ "update-experience-popup-" + this.props.index } className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Add Experience
                        </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor={ "experienceInputTitle" + this.props.index }>Title*</label>
                                    <input type="text" name="jobTitle" className="form-control" id={ "experienceInputTitle" + this.props.index } placeholder="Title" value={ this.state.jobTitle } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor={ "experienceInputCompanyName" + this.props.index }>Company Name*</label>
                                    <input type="text" name="companyName" className="form-control" id={ "experienceInputCompanyName" + this.props.index } placeholder="Company Name" value={ this.state.companyName } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor={ "experienceInputLocation" + this.props.index }>Location</label>
                                    <input type="text" name="jobLocation" className="form-control" id={ "experienceInputLocation" + this.props.index } placeholder="Location" value={ this.state.jobLocation } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor={ "experienceInputStartMonth" + this.props.index }>Start Month*</label>
                                    { selectMonth( "experienceInputStartMonth" + this.props.index, "jobStartMonth", this.state.jobStartMonth, this.changeStartMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor={ "experienceInputStartYear" + this.props.index }>Start Year*</label>
                                    <input type="number" name="jobStartYear" className="form-control" id={ "experienceInputStartYear" + this.props.index } value={ this.state.jobStartYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor={ "experienceInputEndMonth" + this.props.index }>End Month</label>
                                    { selectMonth( "experienceInputEndMonth" + this.props.index, "jobEndMonth", this.state.jobEndMonth, this.changeEndMonth ) }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor={ "experienceInputEndYear" + this.props.index }>End Year</label>
                                    <input type="number" name="jobEndYear" className="form-control" id={ "experienceInputEndYear" + this.props.index } value={ this.state.jobEndYear } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor={ "experienceInputDescription" + this.props.index }>Description</label>
                                    <textarea type="text" name="jobDescription" className="form-control" id={ "experienceInputDescription" + this.props.index } placeholder="Description" value={ this.state.jobDescription } onChange={ this.onChange } />
                                </div>
                            </div>
                        </form>
                        <div className="error">
                            { this.state.error }
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.updateExperience } />
                </div>
            </div>
        )
    }

}

export default UpdateExperience;
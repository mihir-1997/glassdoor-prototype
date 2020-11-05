import React, { Component } from 'react'

import './Experience.css'
import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class AddExperience extends Component {

    changeStartMonth = ( e ) => {
        console.log( e.target.value )
    }

    changeEndMonth = ( e ) => {
        console.log( e.target.value )
    }

    closePopup = () => {
        let popup = document.getElementById( "experience-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveExperience = () => {

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
                                    <label htmlFor="inputTitle">Title</label>
                                    <input type="text" className="form-control" id="inputTitle" placeholder="Title" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="inputCompanyName">Company Name</label>
                                    <input type="text" className="form-control" id="inputCompanyName" placeholder="Company Name" />
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
                    <Footer closePopup={ this.closePopup } saveExperience={ this.saveExperience } />
                </div>
            </div>
        )
    }
}

export default AddExperience;
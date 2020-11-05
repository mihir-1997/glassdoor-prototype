import React, { Component } from 'react'

import './Skills.css'
import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class UpdateSkills extends Component {

    closePopup = () => {
        let popup = document.getElementById( "skills-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveSkills = () => {

    }

    render () {

        return (
            <div id="skills-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Skills
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <input type="text" className="form-control" placeholder="Enter a Skill (ex: Data Analysis)" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveSkills } />
                </div>
            </div>
        )
    }
}

export default UpdateSkills;
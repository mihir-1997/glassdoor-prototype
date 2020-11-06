import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddRace extends Component {

    closePopup = () => {
        let popup = document.getElementById( "race-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveRace = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div id="race-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Select Race
                        </div>
                        <div>
                            <form>
                                <div>
                                    <input type="checkbox" value="Indigenous American or Alaska Native" />&nbsp;&nbsp;Indigenous American or Alaska Native
                                </div>
                                <div>
                                    <input type="checkbox" value="East Asian" />&nbsp;&nbsp;East Asian
                                </div>
                                <div>
                                    <input type="checkbox" value="South Asian" />&nbsp;&nbsp;South Asian
                                </div>
                                <div>
                                    <input type="checkbox" value="Southeast Asian" />&nbsp;&nbsp;Southeast Asian
                                </div>
                                <div>
                                    <input type="checkbox" value="Native Hawaiian or Other Pacific Islander" />&nbsp;&nbsp;Native Hawaiian or Other Pacific Islander
                                </div>
                                <div>
                                    <input type="checkbox" value="Middle Eastern" />&nbsp;&nbsp;Middle Eastern
                                </div>
                                <div>
                                    <input type="checkbox" value="Black or African American" />&nbsp;&nbsp;Black or African American
                                </div>
                                <div>
                                    <input type="checkbox" value="Hispanic or Latinx" />&nbsp;&nbsp;Hispanic or Latinx
                                </div>
                                <div>
                                    <input type="checkbox" value="White" />&nbsp;&nbsp;White
                                </div>
                                <div>
                                    <input type="checkbox" value="Prefer to Self Describe" />&nbsp;&nbsp;Prefer to Self Describe
                                </div>
                                <div>
                                    <input type="checkbox" value="Prefer Not to Say" />&nbsp;&nbsp;Prefer Not to Say
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveRace } />
                </div>
            </div >
        )
    }
}

export default AddRace;
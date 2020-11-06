import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddVeteran extends Component {

    closePopup = () => {
        let popup = document.getElementById( "veteran-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveVeteran = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div id="veteran-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Select Veteran Status
                        </div>
                        <div>
                            <form>
                                <div>
                                    <input type="radio" name="veteran" value="Yes" />&nbsp;&nbsp;Yes
                                </div>
                                <div>
                                    <input type="radio" name="veteran" value="No" />&nbsp;&nbsp;No
                                </div>
                                <div>
                                    <input type="radio" name="veteran" value="Prefer Not to Say" />&nbsp;&nbsp;Prefer Not to Say
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveVeteran } />
                </div>
            </div >
        )
    }
}

export default AddVeteran;
import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddDisability extends Component {

    closePopup = () => {
        let popup = document.getElementById( "disability-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveDisability = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div id="disability-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Select Disablity
                        </div>
                        <div>
                            <form>
                                <div>
                                    <input type="radio" name="disability" value="Yes" />&nbsp;&nbsp;Yes
                                </div>
                                <div>
                                    <input type="radio" name="disability" value="No" />&nbsp;&nbsp;No
                                </div>
                                <div>
                                    <input type="radio" name="disability" value="Prefer Not to Say" />&nbsp;&nbsp;Prefer Not to Say
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveDisability } />
                </div>
            </div >
        )
    }
}

export default AddDisability;
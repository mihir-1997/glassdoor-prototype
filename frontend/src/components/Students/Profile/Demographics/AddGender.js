import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddGender extends Component {

    closePopup = () => {
        let popup = document.getElementById( "gender-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveGender = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div id="gender-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Select Gender
                        </div>
                        <div>
                            <form>
                                <div>
                                    <input type="radio" name="gener" value="Man" />&nbsp;&nbsp;Man
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Woman" />&nbsp;&nbsp;Woman
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Non-Binary" />&nbsp;&nbsp;Non-Binary
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Prefer to Self Describe" />&nbsp;&nbsp;Prefer to Self Describe
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Prefer Not to Say" />&nbsp;&nbsp;Prefer Not to Say
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveGender } />
                </div>
            </div >
        )
    }
}

export default AddGender;
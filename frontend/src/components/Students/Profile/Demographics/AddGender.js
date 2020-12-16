import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddGender extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            gender: "",
            error: ""
        }
    }

    onChange = ( e ) => {
        this.setState( {
            gender: e.target.value
        } )
    }


    closePopup = () => {
        let popup = document.getElementById( "gender-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveGender = () => {
        if ( this.state.gender ) {
            this.closePopup()
            this.props.saveGender( this.state.gender )
        } else {
            this.setState( {
                error: "Please select one"
            } )
        }
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
                                    <input type="radio" name="gener" value="Man" onChange={ this.onChange } />&nbsp;&nbsp;Man
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Woman" onChange={ this.onChange } />&nbsp;&nbsp;Woman
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Non-Binary" onChange={ this.onChange } />&nbsp;&nbsp;Non-Binary
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Prefer to Self Describe" onChange={ this.onChange } />&nbsp;&nbsp;Prefer to Self Describe
                                </div>
                                <div>
                                    <input type="radio" name="gener" value="Prefer Not to Say" onChange={ this.onChange } />&nbsp;&nbsp;Prefer Not to Say
                                </div>
                            </form>
                            <div className="error">
                                { this.state.error }
                            </div>
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveGender } />
                </div>
            </div >
        )
    }
}

export default AddGender;
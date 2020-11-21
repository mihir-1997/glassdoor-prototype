import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddVeteran extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            veteran: "",
            error: ""
        }
    }

    onChange = ( e ) => {
        this.setState( {
            veteran: e.target.value
        } )
    }

    closePopup = () => {
        let popup = document.getElementById( "veteran-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveVeteran = () => {
        if ( this.state.veteran ) {
            this.closePopup()
            this.props.saveVeteran( this.state.veteran )
        } else {
            this.setState( {
                error: "Please select one"
            } )
        }
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
                                    <input type="radio" name="veteran" value="Yes" onChange={ this.onChange } />&nbsp;&nbsp;Yes
                                </div>
                                <div>
                                    <input type="radio" name="veteran" value="No" onChange={ this.onChange } />&nbsp;&nbsp;No
                                </div>
                                <div>
                                    <input type="radio" name="veteran" value="Prefer Not to Say" onChange={ this.onChange } />&nbsp;&nbsp;Prefer Not to Say
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
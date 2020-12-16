import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddDisability extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            disability: "",
            error: ""
        }
    }

    onChange = ( e ) => {
        this.setState( {
            disability: e.target.value
        } )
    }

    closePopup = () => {
        let popup = document.getElementById( "disability-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveDisability = () => {
        if ( this.state.disability ) {
            this.closePopup()
            this.props.saveDisability( this.state.disability )
        } else {
            this.setState( {
                error: "Please select one"
            } )
        }
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
                                    <input type="radio" name="disability" value="Yes" onChange={ this.onChange } />&nbsp;&nbsp;Yes
                                </div>
                                <div>
                                    <input type="radio" name="disability" value="No" onChange={ this.onChange } />&nbsp;&nbsp;No
                                </div>
                                <div>
                                    <input type="radio" name="disability" value="Prefer Not to Say" onChange={ this.onChange } />&nbsp;&nbsp;Prefer Not to Say
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
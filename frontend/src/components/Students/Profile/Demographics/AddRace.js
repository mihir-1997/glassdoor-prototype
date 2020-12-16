import React, { Component } from 'react'

import Header from '../../../Popup/Header'
import Footer from '../../../Popup/Footer'

class AddRace extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            race: "",
            error: ""
        }
    }

    onChange = ( e ) => {
        this.setState( {
            race: e.target.value
        } )
    }


    closePopup = () => {
        let popup = document.getElementById( "race-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveRace = ( e ) => {
        if ( this.state.race ) {
            this.closePopup()
            this.props.saveRace( this.state.race )
        } else {
            this.setState( {
                error: "Please select one"
            } )
        }
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
                                    <input type="radio" name="race" value="Indigenous American or Alaska Native" onChange={ this.onChange } />&nbsp;&nbsp;Indigenous American or Alaska Native
                                </div>
                                <div>
                                    <input type="radio" name="race" value="East Asian" onChange={ this.onChange } />&nbsp;&nbsp;East Asian
                                </div>
                                <div>
                                    <input type="radio" name="race" value="South Asian" onChange={ this.onChange } />&nbsp;&nbsp;South Asian
                                </div>
                                <div>
                                    <input type="radio" name="race" value="Southeast Asian" onChange={ this.onChange } />&nbsp;&nbsp;Southeast Asian
                                </div>
                                <div>
                                    <input type="radio" name="race" value="Native Hawaiian or Other Pacific Islander" onChange={ this.onChange } />&nbsp;&nbsp;Native Hawaiian or Other Pacific Islander
                                </div>
                                <div>
                                    <input type="radio" name="race" value="Middle Eastern" onChange={ this.onChange } />&nbsp;&nbsp;Middle Eastern
                                </div>
                                <div>
                                    <input type="radio" name="race" value="Black or African American" onChange={ this.onChange } />&nbsp;&nbsp;Black or African American
                                </div>
                                <div>
                                    <input type="radio" name="race" value="Hispanic or Latinx" onChange={ this.onChange } />&nbsp;&nbsp;Hispanic or Latinx
                                </div>
                                <div>
                                    <input type="radio" name="race" value="White" onChange={ this.onChange } />&nbsp;&nbsp;White
                                </div>
                                <div>
                                    <input type="radio" name="race" value="Prefer to Self Describe" onChange={ this.onChange } />&nbsp;&nbsp;Prefer to Self Describe
                                </div>
                                <div>
                                    <input type="radio" name="race" value="Prefer Not to Say" onChange={ this.onChange } />&nbsp;&nbsp;Prefer Not to Say
                                </div>
                            </form>
                        </div>
                        <div className="error">
                            { this.state.error }
                        </div>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveRace } />
                </div>
            </div >
        )
    }
}

export default AddRace;
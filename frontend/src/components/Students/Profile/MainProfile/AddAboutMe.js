import React, { Component } from 'react'

import Footer from '../../../Popup/Footer'
import Header from '../../../Popup/Header'

class AddAboutMe extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            aboutMe: this.props.aboutMe
        }
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    saveaboutMe = ( e ) => {
        let aboutMe = {
            aboutMe: this.state.aboutMe
        }
        this.props.saveAboutMe( aboutMe )
    }

    closePopup = () => {
        let popup = document.getElementById( "aboutme-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    render () {
        return (
            <div>
                <div id="aboutme-popup" className="popup-container">
                    <div className="popup-wrapper">
                        <Header closePopup={ this.closePopup } />
                        <div className="popup-body">
                            <div className="popup-title">
                                Edit About Me
                            </div>
                            <form className="popup-form">
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label htmlFor="aboutMeInputAboutMe">About Me</label>
                                        <textarea type="text" name="aboutMe" className="form-control" id="aboutMeInputName" placeholder="About Me" value={ this.state.aboutMe } onChange={ this.onChange } />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Footer closePopup={ this.closePopup } saveChanges={ this.saveaboutMe } />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddAboutMe;
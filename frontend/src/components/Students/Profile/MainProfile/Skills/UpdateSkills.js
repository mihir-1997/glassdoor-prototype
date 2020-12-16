import React, { Component } from 'react'

import './Skills.css'
import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class UpdateSkills extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            skill: ""
        }
    }

    closePopup = () => {
        let popup = document.getElementById( "skills-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    saveSkills = () => {
        if ( this.state.skill ) {
            let skills = {
                skills: this.state.skill
            }
            this.props.saveSkill( skills )
        }
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
                                    <input type="text" name="skill" className="form-control" placeholder="Enter a Skill (ex: Data Analysis)" value={ this.state.skill } onChange={ this.onChange } />
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
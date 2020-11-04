import React, { Component } from 'react'

class Footer extends Component {

    closePopup = ( e ) => {
        e.preventDefault()
        this.props.closePopup()
    }

    saveExperience = ( e ) => {
        e.preventDefault()
        this.props.saveExperience()
    }

    render () {
        return (
            <div>
                <div className="popup-buttons-wrapper">
                    <div className="popup-buttons">
                        <button type="button" className="btn update-profile" onClick={ this.closePopup }>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.saveExperience }>Save Changes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
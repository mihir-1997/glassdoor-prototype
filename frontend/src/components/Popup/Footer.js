import React, { Component } from 'react'

class Footer extends Component {

    closePopup = ( e ) => {
        e.preventDefault()
        this.props.closePopup()
    }

    saveChanges = ( e ) => {
        e.preventDefault()
        this.props.saveChanges()
    }

    render () {
        let successButton = "Save Changes"
        if ( this.props ) {
            if ( this.props.buttonName ) {
                successButton = this.props.buttonName
            }
        }
        return (
            <div>
                <div className="popup-buttons-wrapper">
                    <div className="popup-buttons">
                        <button type="button" className="btn update-profile" onClick={ this.closePopup }>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.saveChanges }>{ successButton }</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
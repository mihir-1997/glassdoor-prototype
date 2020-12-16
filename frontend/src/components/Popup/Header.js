import React, { Component } from 'react'

import './Popup.css'

class Header extends Component {

    closePopup = ( e ) => {
        e.preventDefault()
        console.log( "header close popup" )
        this.props.closePopup()
    }

    render () {
        let headerText = null
        if ( this.props ) {
            if ( this.props.headerText ) {
                headerText = this.props.headerText
            }
        }
        return (
            <div className="header-wrapper clear-float">
                <div className="header-text">
                    { headerText }
                </div>
                <div className="cancel-button" onClick={ this.closePopup }>
                    <svg className="cancel-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path className="cancel-icon-path" d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="#C4C7CB" fillRule="evenodd"></path>
                        <path className="cancel-icon-path-hover" d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="currentcolor" fillRule="evenodd"></path>
                    </svg>
                </div>
            </div>
        )
    }
}

export default Header;
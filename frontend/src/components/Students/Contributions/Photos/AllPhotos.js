import React, { Component } from 'react'

import Header from '../../../Popup/Header'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class AllPhotos extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            photos: this.props.photos
        }
    }

    closePopup = ( id ) => {
        let popup = document.getElementById( "allphotos-popup" + id )
        popup.classList.remove( "popup-wrapper-show" )
    }

    render () {
        return (
            <div>
                <div id={ "allphotos-popup" + this.props.id } className="popup-container">
                    <div className="popup-wrapper">
                        <Header headerText={ this.props.employerName } closePopup={ () => this.closePopup( this.props.id ) } />
                        <div className="popup-body">
                            <div className="popup-title">

                            </div>
                            <div className="allphotos">
                                { this.state.photos ?
                                    this.state.photos.map( ( photo, index ) => {
                                        return <img src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/officePhotos/" + photo.photo } key={ index } className="contributions-allphotos-photo" alt={ "company" + index } />
                                    } )
                                    : null }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllPhotos;
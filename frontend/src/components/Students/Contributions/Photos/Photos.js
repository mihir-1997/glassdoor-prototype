import React, { Component } from 'react'
import axios from 'axios'

import SEO from '../../../SEO/SEO'
import AddContribution from '../AddContributionHelper'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'
import AllPhotos from './AllPhotos'

class Photos extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            photos: []
        }
    }

    componentDidMount () {
        SEO( {
            title: "Your Photo History | Glassdoor"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getPhotosbyStudent/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        this.setState( {
                            photos: res.data
                        } )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message )
                        }
                    }
                } )
        }
    }

    showAllPhotos = ( index ) => {
        let popup = document.getElementById( "allphotos-popup" + index )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    render () {
        let contribution = {
            heading: "Photos",
            add_button: "Add Photos"
        }
        let getDate = ( date ) => {
            let formattedDate = new Date( parseInt( date ) )
            return ( formattedDate.getMonth() + 1 ) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
        }
        return (
            <div className="contributions-right-pane">
                <AddContribution contribution={ contribution } />
                <div className="contributions-text">
                    All photos you've posted are displayed below.
                </div>
                <div className="all-interviews">
                    <div className="row contributions-stat-heading">
                        <div className="col-5 contributions-stat-column">
                            <strong>Details</strong>
                        </div>
                        <div className="col-3 contributions-stat-column">
                            <strong>Submitted</strong>
                        </div>
                        <div className="col-4 contributions-stat-column">
                            <strong>Status</strong>
                        </div>
                    </div>
                    { this.state.photos ?
                        this.state.photos.map( ( photo, index ) => {
                            return <div className="row contributions-stats" key={ index }>
                                <div className="col-5 contributions-stat-column">
                                    <div className="photos-employer-name">
                                        { photo.employerName }
                                    </div>
                                    <div>
                                        { photo.photos.length > 0 ?
                                            <img src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/officePhotos/" + photo.photos[ 0 ].photo } className="contributions-table-photo" alt="company" />
                                            : null }
                                        <AllPhotos id={ index } photos={ photo.photos } employerName={ photo.employerName } key={ Math.random() } />
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-primary show-photos" onClick={ () => this.showAllPhotos( index ) }>View All</button>
                                    </div>
                                </div>
                                <div className="col-3 contributions-stat-column">
                                    { photo.photos[ 0 ].photoDate ?
                                        getDate( photo.photos[ 0 ].photoDate )
                                        : null }
                                </div>
                                <div className="col-4 contributions-stat-column">
                                    { photo.photos.length > 0 ?
                                        photo.photos[ 0 ].photoStatus
                                        : null }
                                </div>
                            </div>
                        } )
                        : null }
                </div>
            </div >
        )
    }
}

export default Photos;
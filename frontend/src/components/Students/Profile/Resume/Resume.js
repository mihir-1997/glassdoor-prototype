import React, { Component } from 'react'
import axios from 'axios'

import './Resume.css'
import AddResume from './AddResume'
import SEO from '../../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'
const FormData = require( 'form-data' )

class Resume extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            resumes: []
        }
    }

    componentDidMount () {
        SEO( {
            title: "Manage resumes | Glassdoor"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/students/getUser/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.setState( {
                            resumes: res.data.resume
                        } )
                    }
                } )
                .catch( ( err ) => {
                    console.log( err )
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

    addResume = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "resume-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
        SEO( {
            title: "Upload Resume"
        } )
    }

    saveResume = ( resume, isPrimary ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            const formData = new FormData()
            formData.append( 'myResume', resume )
            formData.append( 'isPrimary', isPrimary )
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/students/addUserResume/" + id, formData, config )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.componentDidMount()
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

    deleteResume = ( resumeID ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            let data = {
                resumeID: resumeID
            }
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.delete( BACKEND_URL + ":" + BACKEND_PORT + "/students/removeUserResume/" + id, { data: data } )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.componentDidMount()
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

    changePrimaryResume = ( e ) => {
        e.preventDefault()
        this.state.resumes.forEach( ( resume, index ) => {
            let checkbox = document.getElementById( "isprimary-input" + index )
            checkbox.removeAttribute( "defaultChecked" )
            checkbox.removeAttribute( "disabled" )
            checkbox.setAttribute( "value", resume.resumeID )
        } )
    }

    updatePrimaryResume = ( e ) => {
        e.preventDefault()
        let id = localStorage.getItem( "id" )
        if ( id ) {
            let data = {
                resumeID: e.target.value
            }
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/students/updateUserPrimaryResume/" + id, data )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.componentDidMount()
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

    render () {
        let getDate = ( date ) => {
            let formattedDate = new Date( parseInt( date ) )
            return ( formattedDate.getMonth() + 1 ) + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
        }
        return (
            <div>
                <div className="resume-wrapper">
                    <div className="row resume-title">
                        <div className="col-11">
                            <h3>
                                Manage resumes
                        </h3>
                        </div>
                        <div className="col-1">
                            <div className="resume-add-icon">
                                <span onClick={ this.addResume }>
                                    <svg className="basic-info-circle-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <g className="basic-info-circle-g" fill="none" fillRule="evenodd">
                                            <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                            <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#1861bf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        </g>
                                        <g className="basic-info-circle-g-hover" fill="none" fillRule="evenodd">
                                            <circle cx="12" cy="12" fill="#1861bf" r="12"></circle>
                                            <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#f5f6f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    { this.state.resumes ?
                        this.state.resumes.map( ( resume, index ) => {
                            return <div className="each-resume" key={ index }>
                                <div className="row">
                                    <div className="col-1">
                                        <input type="checkbox" id={ "isprimary-input" + index } name="isprimary-input" checked={ resume.isPrimary } disabled={ !resume.isPrimary } onChange={ this.updatePrimaryResume } />
                                    </div>
                                    <div className="col-1">
                                        <div className="pdf-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                                                <path fill="#999999" d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div>
                                            <div className="resume-details-left">
                                                <div className="resume-name">
                                                    <a href={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/resumes/" + resume.imageName } download>
                                                        { resume.resumeName }
                                                    </a>
                                                </div>
                                                <div className="resume-date">
                                                    { resume.date ?
                                                        getDate( resume.date )
                                                        : null }
                                                </div>
                                            </div>
                                            <div className="resume-delete-icon" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={ () => { this.deleteResume( resume.resumeID ) } }>
                                                    <path d="M13.67 3h-3.34a.75.75 0 00-.75.75V5h4.84V3.71a.75.75 0 00-.75-.71zM15 8a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 0115 8zM9 8a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 019 8zm3 0a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 0112 8zm6-2H6l.21 14.83a.33.33 0 00.32.25l11-.08a.33.33 0 00.32-.26zm-4.33-4a1.75 1.75 0 011.75 1.75V5h5a.53.53 0 01.56.5.54.54 0 01-.56.5H19l-.17 14.8v.07A1.34 1.34 0 0117.5 22H6.55a1.33 1.33 0 01-1.32-1.12v-.07L5 6H3.56A.54.54 0 013 5.46.53.53 0 013.56 5h5V3.71A1.75 1.75 0 0110.33 2z" fill="currentColor" fillRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } )
                        : null
                    }
                    { this.state.resumes.length > 0 ?
                        <div className="change-primary-resume clear-both">
                            <button type="button" className="btn reverse-update-proflie right-pane" onClick={ this.changePrimaryResume }>Change Primary Resume</button>
                        </div>
                        : null }
                </div>
                <AddResume saveResume={ this.saveResume } />
            </div>
        )
    }
}

export default Resume;
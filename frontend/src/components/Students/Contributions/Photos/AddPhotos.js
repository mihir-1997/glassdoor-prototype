import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'
const FormData = require( 'form-data' )

class AddPhotos extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            employerID: "",
            employerName: "",
            workdayPhotos: [],
            employers: [],
            error: "",
            redirectToContributions: false
        }
    }

    componentDidMount () {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/employers/getAllEmployers" )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.setState( {
                            employers: res.data
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

    onChange = ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.files
        } )
    }

    employerChange = ( e ) => {
        this.setState( {
            employerID: e[ 0 ].id,
            employerName: e[ 0 ].label
        } )
    }

    addPhotos = ( e ) => {
        e.preventDefault()
        if ( this.state.employerID && this.state.employerName && this.state.workdayPhotos.length > 0 ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                const formData = new FormData()
                Array.from( this.state.workdayPhotos ).forEach( ( file ) => {
                    formData.append( 'officePhotos', file )
                } )
                formData.append( 'employerName', this.state.employerName )
                formData.append( 'studentID', id )
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/uploadPhotos/" + this.state.employerID, formData, config )
                    .then( ( res ) => {
                        if ( res.status === 200 ) {
                            this.setState( {
                                redirectToContributions: !this.state.redirectToContributions
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
        } else {
            this.setState( {
                error: "*Please fill all required fields"
            } )
        }
    }

    render () {
        let redirect = null
        if ( this.state.redirectToContributions ) {
            redirect = <Redirect to="/students/contributions" />
        }
        let options = this.state.employers.map( employer => {
            return { id: employer._id, label: employer.name }
        } )
        console.log( options )
        return (
            <div>
                { redirect }
                <form>
                    <div className="form-group row">
                        <label htmlFor="photosEmployer" className="col-4">Employer Name*</label>
                        <div className="col-8">
                            <Typeahead id="employerID" name="employerID" options={ options } paginate={ false } placeholder="Select Employer..." onChange={ this.employerChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="photosPaths" className="col-4">Select Photos*</label>
                        <div className="col-8">
                            <input type="file" name="workdayPhotos" accept="image/*" max="10" onChange={ this.onChange } multiple />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addPhotos }>
                            Upload Photos
                        </button>
                    </div>
                </form>
                <div className="error">
                    { this.state.error }
                </div>
            </div>
        )
    }
}

export default AddPhotos;
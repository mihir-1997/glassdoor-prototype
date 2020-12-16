import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class AddReview extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            rating: 0,
            isPositive: false,
            employerName: "",
            employeeStatus: "",
            recommended: false,
            headline: "",
            approveCEO: false,
            pros: "",
            cons: "",
            description: "",
            employers: [],
            ceoname: "",
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
        if ( e.target.name === "rating" ) {
            if ( parseInt( e.target.value ) < 0 || parseInt( e.target.value ) > 5 ) {
                this.setState( {
                    error: "Ratings must be between 0 and 5"
                } )
                return
            }
            this.setState( {
                [ e.target.name ]: parseInt( e.target.value )
            } )
        } else {
            this.setState( {
                [ e.target.name ]: e.target.value
            } )
        }
    }

    radioChange = ( e ) => {
        this.setState( {
            [ e.target.name ]: !this.state[ e.target.name ]
        } )
    }

    employerNameChange = ( e ) => {
        this.setState( {
            employerName: e[ 0 ].label,
            ceoname: e[ 0 ].id
        } )
    }

    addReview = ( e ) => {
        e.preventDefault()
        if ( this.state.employerName && this.state.rating && this.state.headline && this.state.pros && this.state.cons && this.state.description && this.state.error === "" ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                let review = {
                    studentID: id,
                    studentName: localStorage.getItem( "name" ),
                    employerName: this.state.employerName,
                    ceoName: this.state.ceoname,
                    employeeStatus: this.state.employeeStatus,
                    rating: this.state.rating,
                    isPositive: this.state.isPositive,
                    recommended: this.state.recommended,
                    approveCEO: this.state.approveCEO,
                    headline: this.state.headline,
                    pros: this.state.pros,
                    cons: this.state.cons,
                    description: this.state.description,
                }
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/addReview", review )
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
        let options = []
        if ( this.state.employers ) {
            this.state.employers.forEach( employer => {
                options.push( { id: employer.ceoname, label: employer.name } )
            } );
            // options = this.state.employers.map( employer => { return { id: employer.ceoname, value: employer.name } } )
        }
        return (
            <div>
                { redirect }
                <form className="add-review">
                    <div className="form-group row">
                        <label htmlFor="employerName" className="col-4">Employer Name*</label>
                        <div className="col-8">
                            <Typeahead id="employerName" name="employerName" options={ options } paginate={ false } placeholder="Select Employer..." onChange={ this.employerNameChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="rating" className="col-4">Overall Ratings*</label>
                        <div className="col-8">
                            <input type="number" name="rating" className="form-control" id="rating" placeholder="Ratings" min={ 0 } max={ 5 } onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="employeeStatus" className="col-4">Are you a current or former employee?</label>
                        <div className="col-8">
                            <select id="employeeStatus" name="employeeStatus" onChange={ this.onChange }>
                                <option value="">Select</option>
                                <option value="Current">Current</option>
                                <option value="Former">Former</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="headline" className="col-4">Review Headline*</label>
                        <div className="col-8">
                            <input type="text" name="headline" className="form-control" id="headline" placeholder="" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="pros" className="col-4">Pros*</label>
                        <div className="col-8">
                            <textarea type="text" name="pros" className="form-control" id="pros" placeholder="Share some of the best reasons to work at the company" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="cons" className="col-4">Cons*</label>
                        <div className="col-8">
                            <textarea type="text" name="cons" className="form-control" id="cons" placeholder="Share some of the downside working at the company" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="isPositive" className="col-4">How's experience?*</label>
                        <div className="col-8">
                            <input type="radio" name="isPositive" value={ true } onChange={ this.radioChange } checked={ this.state.isPositive === true } />&nbsp;Positive
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="isPositive" value={ false } onChange={ this.radioChange } checked={ this.state.isPositive === false } />&nbsp;Negative
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="recommended" className="col-4">Do you recommend?*</label>
                        <div className="col-8">
                            <input type="radio" name="recommended" value={ true } onChange={ this.radioChange } checked={ this.state.recommended === true } />&nbsp;Yes
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="recommended" value={ false } onChange={ this.radioChange } checked={ this.state.recommended === false } />&nbsp;No
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="approveCEO" className="col-4">Do you approve CEO?*</label>
                        <div className="col-8">
                            <input type="radio" name="approveCEO" value={ true } onChange={ this.radioChange } checked={ this.state.approveCEO === true } />&nbsp;Yes
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="approveCEO" value={ false } onChange={ this.radioChange } checked={ this.state.approveCEO === false } />&nbsp;No
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-4">Review Text*</label>
                        <div className="col-8">
                            <textarea type="text" name="description" className="form-control" id="description" placeholder="Review Description" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addReview }>
                            Add Review
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

export default AddReview;
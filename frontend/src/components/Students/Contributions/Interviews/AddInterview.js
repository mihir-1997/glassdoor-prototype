import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class AddInterview extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            employerName: "",
            overallExperience: "",
            jobTitle: "",
            description: "",
            difficulty: "",
            offerStatus: "",
            questionAnswers: "",
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
            [ e.target.name ]: e.target.value
        } )
    }

    employerNameChange = ( e ) => {
        this.setState( {
            employerName: e[ 0 ]
        } )
    }

    addInterview = ( e ) => {
        e.preventDefault()
        if ( this.state.employerName && this.state.jobTitle && this.state.offerStatus && this.state.overallExperience && this.state.description ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                let interview = {
                    studentID: id,
                    employerName: this.state.employerName,
                    overallExperience: this.state.overallExperience,
                    jobTitle: this.state.jobTitle,
                    description: this.state.description,
                    difficulty: this.state.difficulty,
                    offerStatus: this.state.offerStatus,
                    questionAnswers: this.state.questionAnswers
                }
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/addInterview", interview )
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
        return (
            <div>
                { redirect }
                <form className="add-interview">
                    <div className="form-group row">
                        <label htmlFor="jobtitle" className="col-4">Job Title*</label>
                        <div className="col-8">
                            <input type="text" name="jobTitle" className="form-control" id="jobtitle" placeholder="Job Title" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="employerName" className="col-4">Employer Name*</label>
                        <div className="col-8">
                            <Typeahead id="employerName" name="employerName" options={ this.state.employers.map( employer => employer.name ) } paginate={ false } placeholder="Select Employer..." onChange={ this.employerNameChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="overallExperience" className="col-4">Overall Experience*</label>
                        <div className="col-8">
                            <input type="radio" name="overallExperience" value="Positive" onChange={ this.onChange } />&nbsp;Positive
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="overallExperience" value="Neutral" onChange={ this.onChange } />&nbsp;Neutral
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="overallExperience" value="Negative" onChange={ this.onChange } />&nbsp;Negative
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-4">Interview Description*</label>
                        <div className="col-8">
                            <textarea type="text" name="description" className="form-control" id="description" placeholder="Interview Description" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="difficulty" className="col-4">Difficulty</label>
                        <div className="col-8">
                            <input type="radio" name="difficulty" value="Hard" onChange={ this.onChange } />&nbsp;Hard
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="difficulty" value="Average" onChange={ this.onChange } />&nbsp;Average
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="difficulty" value="Easy" onChange={ this.onChange } />&nbsp;Easy
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="offerStatus" className="col-4">Offer Status*</label>
                        <div className="col-8">
                            <input type="radio" name="offerStatus" value="Accepted" onChange={ this.onChange } />&nbsp;Accepted
                            &nbsp;&nbsp;&nbsp;<input type="radio" name="offerStatus" value="Rejected" onChange={ this.onChange } />&nbsp;Rejected
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="questionAnswers" className="col-4">Question Answers</label>
                        <div className="col-8">
                            <textarea type="text" name="questionAnswers" className="form-control" id="questionAnswers" placeholder="" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addInterview }>
                            Add Interview
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

export default AddInterview;
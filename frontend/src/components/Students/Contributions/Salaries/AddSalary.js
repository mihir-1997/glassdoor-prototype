import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class AddSalary extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            jobTitle: "",
            location: "",
            employerName: "",
            baseSalary: "",
            employeeStatus: "",
            yearsOfExperience: "",
            bonuses: "",
            error: "",
            redirectToContributions: false,
            employers: []
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

    addSalary = ( e ) => {
        e.preventDefault()
        if ( this.state.jobTitle && this.state.employerName && this.state.baseSalary && this.state.yearsOfExperience ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                let salary = {
                    studentID: id,
                    employerName: this.state.employerName,
                    baseSalary: this.state.baseSalary,
                    bonuses: this.state.bonuses,
                    jobTitle: this.state.jobTitle,
                    yearsOfExperience: this.state.yearsOfExperience,
                    location: this.state.location,
                    employeeStatus: this.state.employeeStatus
                }
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/addSalary", salary )
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
                <form>
                    <div className="form-group row">
                        <label htmlFor="jobtitle" className="col-4">Job Title*</label>
                        <div className="col-8">
                            <input type="text" name="jobTitle" className="form-control" id="jobtitle" placeholder="Job Title" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="company" className="col-4">Company Name*</label>
                        <div className="col-8">
                            <Typeahead id="employerName" name="employerName" options={ this.state.employers.map( employer => employer.name ) } paginate={ false } placeholder="Select Employer..." onChange={ this.employerNameChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="location" className="col-4">Location</label>
                        <div className="col-8">
                            <input type="text" name="location" className="form-control" id="location" placeholder="Location" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="salaryrate" className="col-4">Salary*</label>
                        <div className="col-8">
                            <input type="number" name="baseSalary" className="form-control" id="salaryrate" placeholder="Salary/year" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="bonuses" className="col-4">Bonuses</label>
                        <div className="col-8">
                            <input type="number" name="bonuses" className="form-control" id="bonuses" placeholder="" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="yearsOfExperience" className="col-4">Years Of Experience*</label>
                        <div className="col-8">
                            <input type="number" name="yearsOfExperience" className="form-control" id="yearsOfExperience" placeholder="" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="salaryemployeestatus" className="col-4">Employee Status</label>
                        <div className="col-8">
                            <select id="salaryemployeestatus" name="employeeStatus" onChange={ this.onChange }>
                                <option value="">Select</option>
                                <option value="Current">Current</option>
                                <option value="Former">Former</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group-row">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addSalary }>
                            Add Salary
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

export default AddSalary;
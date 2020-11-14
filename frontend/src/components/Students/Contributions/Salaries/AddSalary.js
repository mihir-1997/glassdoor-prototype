import React, { Component } from 'react'

class AddSalary extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            jobTitle: "",
            jobLocation: "",
            jobComapny: "",
            jobSalary: "",
            jobEmployeeStatus: "",
        }
    }

    onChange = ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    employeeStatusChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            jobEmployeeStatus: e.target.value
        } )
    }

    addSalary = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div>
                <form>
                    <div class="form-group row">
                        <label for="jobtitle" class="col-4">Job Title</label>
                        <div class="col-8">
                            <input type="text" name="jobTitle" class="form-control" id="jobtitle" placeholder="Job Title" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="location" class="col-4">Location</label>
                        <div class="col-8">
                            <input type="text" name="jobLocation" class="form-control" id="location" placeholder="Location" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="company" class="col-4">Company Name</label>
                        <div class="col-8">
                            <input type="text" name="jobComapny" class="form-control" id="company" placeholder="Company" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="salaryrate" class="col-4">Salary</label>
                        <div class="col-8">
                            <input type="number" name="jobSalary" class="form-control" id="salaryrate" placeholder="Salary/hr" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="salaryemployeestatus" class="col-4">Employee Status</label>
                        <div class="col-8">
                            <select id="salaryemployeestatus" onChange={ this.employeeStatusChange }>
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
            </div>
        )
    }
}

export default AddSalary;
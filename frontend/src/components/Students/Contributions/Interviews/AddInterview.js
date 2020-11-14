import React, { Component } from 'react'

class AddInterview extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            interviewExperience: "",
            interviewEmployer: "",
            interviewEmployeeStatus: ""
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
            interviewEmployeeStatus: e.target.value
        } )
    }

    addInterview = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div>
                <form>
                    <div class="form-group row">
                        <label for="interviewEmployer" class="col-4">Employer Name</label>
                        <div class="col-8">
                            <input type="text" name="interviewEmployer" class="form-control" id="interviewEmployer" placeholder="Employer Name" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="interviewEmployeeStatus" class="col-4">Employee Status</label>
                        <div class="col-8">
                            <select id="interviewEmployeeStatus" onChange={ this.employeeStatusChange }>
                                <option value="">Select</option>
                                <option value="Current">Current</option>
                                <option value="Former">Former</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="interviewExperience" class="col-4">Interview Experience</label>
                        <div class="col-8">
                            <textarea type="text" name="interviewExperience" class="form-control" id="interviewExperience" placeholder="Interview Experience" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addInterview }>
                            Add Interview
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddInterview;
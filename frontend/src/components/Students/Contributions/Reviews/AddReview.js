import React, { Component } from 'react'

class AddReview extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            reviewText: "",
            reviewEmployer: "",
            reviewEmployeeStatus: "",
            reviewRatings: ""
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
            reviewEmployeeStatus: e.target.value
        } )
    }

    addReview = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div>
                <form>
                    <div class="form-group row">
                        <label for="reviewEmployer" class="col-4">Employer Name</label>
                        <div class="col-8">
                            <input type="text" name="reviewEmployer" class="form-control" id="reviewEmployer" placeholder="Employer Name" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="reviewEmployeeStatus" class="col-4">Employee Status</label>
                        <div class="col-8">
                            <select id="reviewEmployeeStatus" onChange={ this.employeeStatusChange }>
                                <option value="">Select</option>
                                <option value="Current">Current</option>
                                <option value="Former">Former</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="reviewRatings" class="col-4">Ratings</label>
                        <div class="col-8">
                            <input type="number" name="reviewRatings" class="form-control" id="reviewRatings" placeholder="Ratings" min="1" max="5" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="reviewText" class="col-4">Review Text</label>
                        <div class="col-8">
                            <textarea type="text" name="reviewText" class="form-control" id="reviewText" placeholder="Review Text" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addReview }>
                            Add Review
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddReview;
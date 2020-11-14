import React, { Component } from 'react'

class AddPhotos extends Component {

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

    addPhotos = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div>
                <form>
                    <div class="form-group row">
                        <label for="photosEmployer" class="col-4">Employer Name</label>
                        <div class="col-8">
                            <input type="text" name="photosEmployer" class="form-control" id="photosEmployer" placeholder="Employer Name" onChange={ this.onChange } />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="photosPaths" class="col-4">Select Photos</label>
                        <div class="col-8">
                            <input type="file" name="workday-photos" accept="image/*" onChange={ this.onChange } multiple />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addPhotos }>
                            Upload Photos
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddPhotos;
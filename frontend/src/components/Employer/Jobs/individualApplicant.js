import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";


import './EmployerJobs.css'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'


class IndividualApplicant extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            status: "",
            redirectTOStudentProfile: false
        }
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )

    }

    changeStatus = () => {
        console.log( this.state.status )

        let _id = this.props.data._id
        console.log( _id )
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/applicationStatusChange/" + _id, { status: this.state.status } )
            .then( ( res ) => {
                console.log( res.data )
                if ( res.status === 200 ) {
                    alert( "Review Status changed" )

                }
            } )
            .catch( ( err ) => {
                if ( err.response ) {
                    if ( err.response.status === 404 ) {
                        console.log( err.response.message )
                    } else if ( err.response.status === 400 ) {
                        console.log( " " + err.response.message )
                    }
                }
            } )
    }

    showOptions = () => {
        return (
            <select name="status" style={ { fontSize: "13px", display: "inline-block", width: "145px", height: "30px", marginRight: "10px" } } class="form-control" onChange={ this.onChange } required={ true }>
                <option value="Select status" selected disabled>
                    Select Status
            </option>
                <option value="Submitted">Submitted</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Initial screening">Initial screening</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
            </select>
        );
    };

    redirectTODtudent = () => {
        this.props.closePopup()
        this.setState( {
            redirectTOStudentProfile: true
        } )
    }

    render () {
        let redirect = null
        if ( this.state.redirectTOStudentProfile ) {
            redirect = <Redirect to={ {
                pathname: "/students/profile",
                state: {
                    studentID: this.props.data.studentID
                }
            } } />
        }

        return (

            <div style={ { marginBottom: "3px" } }>
                {redirect }
                <div style={ { border: "1px solid black", padding: "10px" } }>
                    <div>
                        <span style={ { marginRight: "100px" } }>Resume: <a href={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/resumes/" + this.props.data.imageName } download>Resume</a></span>
                        <button style={ { height: "30px", width: "70px", border: "1px solid lightgray", borderRadius: "3px", backgroundColor: "white", marginBottom: "3px" } } onClick={ this.redirectTODtudent }>{ this.props.data.name }</button>
                        <span> Status: { this.props.data.status }</span>
                        <br />
                        <span>Cover Letter: <a href={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/resumes/" + this.props.data.coverLetterImageName } download>Letter</a></span>
                        <span style={ { marginLeft: "20px" } } >
                            <form onSubmit={ this.changeStatus } style={ { display: "inline-block" } }>
                                { this.showOptions() }
                                <button
                                    type="submit"
                                    className="btn btn-primary r-flex justify-content-center align-items-center" style={ { display: "inline-block", color: "#D32323", background: "white", fontWeight: "bold", border: "1px solid #D32323", fontSize: "11px", textAlign: "center", verticalAlign: "middle", margin: "auto" } }
                                // style={{ display:"inline-block", height:"30px" , alignContent:"center" , background: "#D32323", color: "#ffffff", fontWeight: "bold", borderBlockColor: "white", border: "1px #D32323"}}
                                >
                                    Change Status
                                    </button>
                            </form>
                        </span>

                    </div>

                </div>
            </div>

        )
    }
}

export default IndividualApplicant




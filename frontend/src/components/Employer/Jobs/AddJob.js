import React, { Component } from 'react'
import axios from "axios";

import './EmployerJobs.css'
import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class AddJob extends Component {
    
    constructor( props ) {
        super( props )
        this.state ={
            title:"",
            industry:"",
            country:"",
            type:"",
            address:"",
            city:"",
            state:"",
            zip:"",
            salary:"",
            description:"",
            qualifications:"",
            responsibilities:"",
            error:"",
            logoImageUrl:this.props.logo,
        }
    }
   

    closePopup = () => {
        let popup = document.getElementById( "add-job-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    addJob = () => {
        axios.defaults.withCredentials = true;
        const data = {
            employerID:localStorage.getItem("id"),
            employerName:localStorage.getItem("name"),
            title:this.state.title,
            industry:this.state.industry,
            country:this.state.country,
            type:this.state.type,
            address:this.state.address,
            city:this.state.city,
            state:this.state.state,
            zip:this.state.zip,
            salary:this.state.salary,
            description:this.state.description,
            qualifications:this.state.qualifications,
            responsibilities:this.state.responsibilities,
            logoImageUrl:this.props.logo
        }
        if(data){
        let id = localStorage.getItem( "id" )
            if ( id ){
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post(BACKEND_URL + ":" + BACKEND_PORT + "/jobs/createJob", data)
                .then((res)=>{
                        if(res.status === 200)
                        {
                            window.location.reload()
                        }
                        else{
                            console.log("Error adding job")
                        }
                        //console.log("Response",res);
                })
                .catch((err)=>{
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message +"")
                        }
                    }
                } )
            }
        }

    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    render () {


        return (
            <div id="add-job-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Add Jobs
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Company Name</label>
                                    <input type="text" className="form-control" name="employerName" onChange={this.onChange} value={localStorage.getItem("name")} placeholder="Company Name" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Job Title</label>
                                    <input type="text" className="form-control" name="title" onChange={this.onChange} placeholder="Job Title" />
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-7">
                                    <label htmlFor="experienceInputCompanyName">Address</label>
                                    <input type="text" className="form-control" name="address" onChange={this.onChange} placeholder="Address" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="experienceInputCompanyName">Type</label>
                                    <input type="text" className="form-control" name="type" onChange={this.onChange} placeholder="Type" />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputCompanyName">Industry</label>
                                    <input type="text" className="form-control" name="industry" onChange={this.onChange} placeholder="Industry" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">City</label>
                                    <input type="text" className="form-control" name="city" onChange={this.onChange} placeholder="City" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">State</label>
                                    <input type="text" className="form-control" name="state" onChange={this.onChange} placeholder="State" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Country</label>
                                    <input type="text" className="form-control" name="country" onChange={this.onChange} placeholder="Country" />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Zip</label>
                                    <input type="text" className="form-control" name="zip" onChange={this.onChange} placeholder="Zip" />
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputTitle">Description</label>
                                    <textarea type="text" className="form-control" name="description" onChange={this.onChange} placeholder="Description" />
                                </div>

                            </div>
                            <div className="form-row">

                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputTitle">Qualifications</label>
                                    <textarea type="text" className="form-control" name="qualifications" onChange={this.onChange} placeholder="Qualifications" />
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputTitle">Responsibilities</label>
                                    <textarea type="text" className="form-control" name="responsibilities" onChange={this.onChange} placeholder="Responsibilities" />
                                </div>
                            </div>
                        
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.addJob } />
                </div>
            </div>
        )
    }
}

export default AddJob;
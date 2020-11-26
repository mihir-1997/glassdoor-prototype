import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";


import './EmployerJobs.css'
import AddJob from './AddJob'
import IndividualJob from './individualJob'
import cover from '../../../Images/employer.png'
import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'


class EmployerJobs extends Component {

    constructor( props ) {
        super( props )
        this.state ={
            jobs:[]
        }
    }

    componentDidMount () {
        SEO( {
            title: "Jobs | Glassdoor"
        } )

        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsForEmployer/" + id )
                .then( ( res ) => {
                    console.log(res.data)
                    if ( res.status === 200 ) {
                        this.setState( {
                            jobs:res.data
                        } )
                        console.log(this.state.jobs)
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
    }

    addJob = ( e ) => {
        e.preventDefault()
        
        let popup = document.getElementById( "add-job-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    render() {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        let allJobs = this.state.jobs.map((eachJob) => {
        return (
            <IndividualJob
               key={Math.random()}
              data={eachJob}
            ></IndividualJob>
          );
        })

        return (
            <div className="employer-profile-wrapper">
                {redirectVar}
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={cover} alt="Cover"  />
                    </div>
                    <div className="details-wrapper">
                            <div className="employer-company-logo">
                                <img className="logo" src={logo} alt="logo"/>
                            </div>
                        <div className="details">
                            <h3 style={{marginTop:"10px"}}> {localStorage.getItem("name")} </h3>
                            <br/>
                            <br/>
                        </div>
                        <div className="row multiple-links">
                            <div className="col-1.2 single-link"><a href="/employer/profile">Overview</a> </div> 
                            <div className="col-1.2 single-link"><a href="/employer/reviews">Reviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/jobs">Jobs</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/salaries">Salaries</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/interviews">Interviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/photos">Photos</a> </div>
                            
                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"320px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>Follow</button> */}
                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"10px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}> + Add Review</button> */}

                        </div>
                    </div>   
                    <div className="info-wrapper overflow-auto">
                    
                    <p style={{fontSize:"20px", lineHeight:"27px"}}>Jobs at {localStorage.getItem("name")}</p>

                    <hr/>
                    {allJobs}
                    {/* <div className="job-wrapper">

                        <img className="company-logo-job" src={logo} alt="logo"/>

                        <div className="job">
                        <span className="employer-name">Linkedin</span>
                        
                        
                        <span style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"2px", marginLeft: "320px", display:"inline-block"}}>Posted on: November 15, 2020</span>
                         <br/>
                        <span className="job-title-employer">Site Reliability Engineer</span>
                        <span style={{display:"inline-block",  marginLeft:"55px"}}>Remote</span>
                        <span style={{display:"inline-block", marginLeft:"65px"}}> <span style={{fontWeight:"bold", display:"inline-block", margin:"0px"}}>Industry:</span> Software Engineering</span> 
                        
                        <div className="basic-job-info">
                           <span style={{fontWeight:"bold"}}>Description</span>
                           <br/>
                           <span>LinkedIn was built to help professionals achieve more in their careers, and every day millions of people use our products to make connections, discover opportunities and gain insights.</span>
                            <br/>
                           <span style={{fontWeight:"bold"}}>Qualifications</span>
                           <br/>
                           <span>Experience with Automation, Shell Scripting, Docker, Kubernetes</span>
                           <br/>
                           <span style={{fontWeight:"bold"}}>Responsibilities</span>
                           <br/>
                           <span>Deploy and Spin the architecture of the applications from dev team</span>

                        </div >
                        <div className="job-address">
                        <span style={{fontWeight:"bold"}}>Location</span>
                        <span style={{display:"inline-block", marginLeft:"385px"}}> <span style={{fontWeight:"bold", display:"inline-block", margin:"0px"}}>Salary : $</span>120K</span>              
                        <br/>    
                        <span>📍 11th Market St. San Jose, CA, USA, 95112</span>
                        <br/>
                        <span style={{display:"inline-block"}}>
                        <button className="btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"210px",marginTop:"10px", height:"30px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>View Applicants</button>
                        </span>
                        
                        </div>
                        </div>
                    </div> */}


                     
                       
                    </div> 

                    <div className="form-wrapper-jobs">
                    <button onClick={this.addJob} className = "emp-profile-btn btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"75px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191),",  }}>+ Add Job</button>
                    <AddJob />
                    </div>     
                </div>
                
            </div>
        )
    }
}
export default EmployerJobs;
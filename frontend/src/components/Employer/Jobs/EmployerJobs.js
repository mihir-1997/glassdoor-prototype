import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import './EmployerJobs.css'
import AddJob from './AddJob'
import IndividualJob from './individualJob'
import jobCover from '../../../Images/job.jpg'
import bestPlaces from '../../../Images/best_places.jpg'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'


class EmployerJobs extends Component {

    constructor( props ) {
        super( props )
        this.state ={
            jobs:[],
            logoImageUrl:"",
            currentPage:1,
            totalCount:"",
            elementsPerPage: 3,
            jobStats:{},
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
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/employers/getEmployerById/" + id )
                .then( ( res ) => {
                    //console.log(res)
                    if ( res.status === 200 ) {
                        this.setState( {                           
                            logoImageUrl: res.data.logoImageUrl,
                        } )
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
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsForEmployer/" + id, {
                "firstTime":true,
                "pageNumber":1,
                "pageSize":3
            } )
                .then( ( res ) => {
                    console.log(res.data)
                    if ( res.status === 200 ) {
                        this.setState( {
                            jobs:res.data.jobs,
                            totalCount: res.data.totalCount
                        } )
                        //console.log(this.state.jobs)
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
               logo={this.state.logoImageUrl}
            ></IndividualJob>
          );
        })

        return (
            <div className="employer-profile-wrapper">
                {redirectVar}
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={jobCover} alt="Cover"  />
                    </div>
                    <div className="details-wrapper">
                            <div className="employer-company-logo">
                                <img className="logo" src={BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.logoImageUrl} alt="logo"/>
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
                            <div className="col-1.2 single-link"><a href="/employer/reports">Reports</a> </div>
                            
                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"320px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>Follow</button> */}
                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"10px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}> + Add Review</button> */}

                        </div>
                    </div>   
                    <div className="info-wrapper overflow-auto" style={{ height:"480px"}}>
                    
                    <p style={{fontSize:"20px", lineHeight:"27px", marginLeft:"1px"}}>Jobs at {localStorage.getItem("name")}</p>

                    <hr/>
                    {allJobs}                     
                    </div> 

                    <div className="form-wrapper-jobs">
                    <button onClick={this.addJob} className = "emp-profile-btn btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"75px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191),",  }}>+ Add Job</button>
                    <AddJob 
                    logo={this.state.logoImageUrl}
                     />
                    <div style={{margin:"0% 0% 0% 10%"}}>
                        <img style={{width:"91%", height:"140%"}} src={bestPlaces} alt="Best Places to work in 2020"/>
                    </div>
                    </div>     
                </div>
                
            </div>
        )
    }
}
export default EmployerJobs;
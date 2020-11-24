import React, { Component } from 'react'
import { Redirect } from 'react-router'


import './EmployerJobs.css'
import cover from '../../../Images/employer.png'
import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'



class EmployerJobs extends Component {

    // constructor( props ) {
    //     super( props )
    // }

    componentDidMount () {
        SEO( {
            title: "Jobs | Glassdoor"
        } )
        // if ( this.props ) {
        //     if ( this.props.location.section ) {
        //         if ( this.props.location.section === "resumes" ) {
        //             this.selectSection( "resumes" )
        //         } else if ( this.props.location.section === "job-preference" ) {
        //             this.selectSection( "job-preference" )
        //         } else if ( this.props.location.section === "demographics" ) {
        //             this.selectSection( "demographics" )
        //         }
        //     }
        // }
    }

    render() {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
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
                            <h3>LinkedIn</h3>
                            {/* <h3>{this.state.name}</h3> */}
                            <h6 color="#404040">Part of <a href="microsoft.com">Microsoft</a></h6>
                            {/* <h6 color="#404040">Part of <a href="microsoft.com">{this.state.parentCompany}</a></h6> */}
                         
                        </div>
                        <div className="row multiple-links">
                            <div className="col-1.2 single-link"><a href="/employer/profile">Overview</a> </div> 
                            <div className="col-1.2 single-link"><a href="/employer/reviews">Reviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/jobs">Jobs</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/salaries">Salaries</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/interviews">Interviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/photos">Photos</a> </div>
                            
                            <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"320px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>Follow</button>
                            <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"10px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}> + Add Review</button>

                        </div>
                    </div>   
                    <div className="info-wrapper">
                    
                    <p style={{fontSize:"20px", lineHeight:"27px"}}>Jobs at LinkedIn</p>

                    <hr/>

                    <div className="job-wrapper">

                        <img className="company-logo-job" src={logo} alt="logo"/>

                        <div className="job">
                        <span className="employer-name">Linkedin</span>
                        
                        
                        <span style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"2px", marginLeft: "320px", display:"inline-block"}}>Posted on: November 15, 2020</span>
                         <br/>
                        <span className="job-title-employer">Site Reliability Engineer</span>
                        <span style={{display:"inline-block",  marginLeft:"55px"}}>Remote</span>
                        <span style={{display:"inline-block", marginLeft:"65px"}}>Industry: Software Engineering</span> 

                        <div className="basic-job-info">
                           
                        </div >
                        <div className="job-address">
                        <span>📍 11th Market St. San Jose, CA, USA, 95112</span>             
                        </div>
                        </div>
                    </div>


                     <div className="job-wrapper">

                        <img className="company-logo-job" src={logo} alt="logo"/>

                        <div className="job">
                        <span className="employer-name">Linkedin</span>
                        
                        
                        <span style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"2px", marginLeft: "320px", display:"inline-block"}}>Posted on: November 15, 2020</span>
                         <br/>
                        <span className="job-title-employer">Site Reliability Engineer</span>
                        <span style={{display:"inline-block",  marginLeft:"55px"}}>Remote</span>
                        <span style={{display:"inline-block", marginLeft:"65px"}}>Industry: Software Engineering</span> 

                        <div className="basic-job-info">
                           
                        </div >
                        <div className="job-address">
                        <span>📍 11th Market St. San Jose, CA, USA, 95112</span>             
                        </div>
                        </div>
                    </div>
                       
                    </div> 

                    <div className="form-wrapper">
                    form
                    </div>     
                </div>
                
            </div>
        )
    }
}
export default EmployerJobs;
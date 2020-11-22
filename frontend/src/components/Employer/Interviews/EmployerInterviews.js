import React, { Component } from 'react'
import { Redirect } from 'react-router'


import './EmployerInterviews.css'
import cover from '../../../Images/employer.png'
import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'



class EmployerInterviews extends Component {

    // constructor( props ) {
    //     super( props )
    // }

    componentDidMount () {
        SEO( {
            title: "Interviews | Glassdoor"
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
                    
                    <p style={{fontSize:"20px", lineHeight:"27px"}}>LinkedIn Interviews</p>

                    <hr/>

                    <div className="interview-wrapper">

                        <p style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"8px"}}>November 15, 2020</p>

                        
                        <div className="interview">

                        <p className="interview-string">Site Reliability Engineer Interview</p>
                        
                        <br/>
                        <div className="box"></div>
                        <span >Offer</span>
                        <span className="box"></span>
                        <span> Positive Experience</span>
                        <span className="box"></span>
                        <span>Easy Interview</span>
                        <br/>
                            <div className="pros-cons">
                                <p >Worked for the company for 5 years</p>
                                
                                <p style={{fontWeight: "bold"}}>Pros</p>
                                <p>Good work life balance</p>
                                <p style={{fontWeight: "bold"}}>Cons</p>
                                <p>Stagnant growth</p>

                            </div>
                        </div>
                        <hr/>
                    </div>

                    <div className="interview-wrapper">

                        <p style={{color:"#7F7F7F", fontSize:"14px"}}>November 15, 2020</p>

                        <img className="company-logo-interview" src={logo} alt="logo"/>

                        <div className="interview">

                        <p className="interview-string">"Great company!"</p>
                      
                        <span>Recommends</span>
                        <span>Positive Outlook</span>
                        <span>Approves CEO</span>
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
export default EmployerInterviews;
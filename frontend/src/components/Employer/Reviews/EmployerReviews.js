import React, { Component } from 'react'

import './EmployerReviews.css'
import cover from '../../../Images/employer.png'
import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'



class EmployerProfile extends Component {

    // constructor( props ) {
    //     super( props )
    // }

    componentDidMount () {
        SEO( {
            title: "Reviews | Glassdoor"
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
        return (
            <div className="employer-profile-wrapper">
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
                            <button className="btn reverse-update-profile">
                                Jobs at LinkedIn
                                {/* Jobs at {this.state.name} */}
                            </button>
                        </div>
                        <div className="row multiple-links">
                            <div className="col-1.2 single-link icon-bullseye-select"><a href="/employer/overview">Overview</a> </div> 
                            <div className="col-1.2 single-link"><a href="/employer/profile/reviews">Reviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/profile/jobs">Jobs</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/profile/salaries">Salaries</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/profile/interviews">Interviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/employer/profile/photos">Photos</a> </div>
                            
                            <div className="col-1.2" style={{paddingLeft:"150px", paddingBottom:"15px", paddingTop:"15px"}} >Follow</div>
                            <div className="col-1.2" style={{paddingLeft:"20px",paddingBottom:"15px", paddingTop:"15px"}}>Add Review</div>

                        </div>
                    </div>   
                    <div className="info-wrapper">
                    
                    <p style={{fontSize:"20px", lineHeight:"27px"}}>LinkedIn Reviews</p>

                    <hr/>

                    <div className="review-wrapper">

                        <p style={{color:"#7F7F7F", fontSize:"14px"}}>November 15, 2020</p>

                        <img className="company-logo-review" src={logo} alt="logo"/>
                        
                        <div className="review">

                        <p className="review-string">"Great company!"</p>
                        <p className="star-string"> 5.0 ★★★★★</p>
                        <div className="box"></div>
                        <span >Recommends</span>
                        <span className="box"></span>
                        <span>Positive Outlook</span>
                        <span className="box"></span>
                        <span>Approves CEO</span>
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

                    <div className="review-wrapper">

                        <p style={{color:"#7F7F7F", fontSize:"14px"}}>November 15, 2020</p>

                        <img className="company-logo-review" src={logo} alt="logo"/>

                        <div className="review">

                        <p className="review-string">"Great company!"</p>
                        <p className="star-string"> 5.0 ★★★★★</p>
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
export default EmployerProfile;
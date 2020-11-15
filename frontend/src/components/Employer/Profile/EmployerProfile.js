import React, { Component } from 'react'

import './EmployerProfile.css'
import cover from '../../../Images/employer.png'
import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'
import bullseye from '../../../Images/bullseye-svgrepo-com.svg'


class EmployerProfile extends Component {

    // constructor( props ) {
    //     super( props )
    // }

    componentDidMount () {
        SEO( {
            title: "Employer Profile | Glassdoor"
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
                            <div className="col-1.2 single-link icon-bullseye-select"><a href="/overview">Overview</a> </div> 
                            <div className="col-1.2 single-link"><a href="/employer/profile/overview">Reviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/overview">Jobs</a> </div>
                            <div className="col-1.2 single-link"><a href="/overview">Salaries</a> </div>
                            <div className="col-1.2 single-link"><a href="/overview">Interviews</a> </div>
                            <div className="col-1.2 single-link"><a href="/overview">Benefits</a> </div>
                            <div className="col-1.2 single-link"><a href="/overview">Photos</a> </div>
                            
                            <div className="col-1.2" style={{paddingLeft:"150px", paddingBottom:"15px", paddingTop:"15px"}} >Follow</div>
                            <div className="col-1.2" style={{paddingLeft:"20px",paddingBottom:"15px", paddingTop:"15px"}}>Add Review</div>

                        </div>
                    </div>   
                    <div className="info-wrapper">
                    
                    <p style={{fontSize:"20px", lineHeight:"27px"}}>LinkedIn Overview</p>
                    <div className=" row info-wrapper-row">
                            <div className="col-6 single-row">
                                <span className="span-info"> Website:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; LinkedIn.com
                               
                            </div>
                               
                            <div className="col-6 single-row">
                                <span className="span-info"> Headquarters:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sunnyvale, CA
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> Size:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  10000+ Employees    
                            </div>
                               
                            <div className="col-6 single-row">
                                <span className="span-info"> Founded:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2003          
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> Type:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Subsidiary or Business Segment       
                            </div>
                               
                            <div className="col-6 single-row">
                                <span className="span-info"> Industry:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Internet        
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> Revenue:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $5 to $10 Billion(USD)       
                            </div>

                    </div>
                    <br/>
                    <div className="single-row">
                        <span style={{fontWeight:"bold",  color:"#5D5D5D"}}> Competitors:</span>  
                            New Work SE, Monster Worldwide   &nbsp; &nbsp;  
                        <svg class="SVGInline-svg mr-xsm-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14"><path fill="#1861BF" d="M7.01 9H0v2h7.01v3L11 10 7.01 6v3zm5.98-1V5H20V3h-7.01V0L9 4l3.99 4z" id="comparisonIcon-prefix__compare" stroke="currentColor"></path></svg>
                    </div>

                        LinkedIn is the world’s largest professional network, with nearly 690+ million members in over 200 countries and territories around the world. LinkedIn was built to help professionals achieve more in their careers, and every day our members use our products to make connections, discover opportunities, and gain insights.
                        {/* Info */}

                        <br/>
                        <br/>
                        <span style={{fontWeight:"bold", color:"#5D5D5D"}}> Mission:</span> Our mission is to create economic opportunity for every member of the global workforce and this vision connects our more than 16,000 employees in dozens of offices across five continents. It inspires us to invest in our talent, support career growth, and nurture a workplace where every employee feels part of a culture that prioritizes diversity, inclusion, and belonging. 
                          
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
import React, { Component } from 'react'

import './EmployerProfile.css'
import cover from '../../../Images/employer.jpg'
import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'


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
                            <div className="company-logo">
                                <img className="logo" src={logo} alt="logo"/>
                            </div>
                        <div className="details">
                            <h3>LinkedIn</h3>
                            <h6 color="#404040">Part of <a href="microsoft.com">Microsoft</a></h6>

                            <button className="btn btn-primary jobs-at">
                                Jobs at LinkedIn
                            </button>
                        </div>
                    </div>   
                    <div className="info-wrapper">
                    
                    </div>      
                </div>
                
            </div>
        )
    }
}
export default EmployerProfile;
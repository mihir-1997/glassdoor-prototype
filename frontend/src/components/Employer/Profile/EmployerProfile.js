import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import './EmployerProfile.css'
import EditProfile from './EditProfile'
import cover from '../../../Images/employer.png'
import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'


import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
const FormData = require( 'form-data' )

class EmployerProfile extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            employer_id:"",
            name: "",
            email:"",
            address:"",
            profileImageUrl:"",
            website:"",
            companySize:"",
            companyType:"",
            revenue:"",
            headquarter:"",
            industry:"",
            founded:"",
            mission:"",
            ceoname:"",

        }
    }

    changeProfilePicture = ( e ) => {
        e.preventDefault()
        let id = localStorage.getItem( "id" )
        if ( id ) {
            const formData = new FormData()
            formData.append( 'myImage', e.target.files[ 0 ] )
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/employers/updateEmployerProfilePicture/" + id, formData, config )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.setState( {
                            profileImageUrl: res.data.profileImageUrl
                        } )
                        console.log( res.data )
                    }
                } )
                .catch( ( err ) => {
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

    clickProfileButton = (e) =>{
        e.preventDefault();
        console.log("button clicked")
        
        let inp = document.getElementById('employer-profile-picture')
        console.log(inp)
        inp.click()
        
    }

    componentDidMount () {
        SEO( {
            title: "Employer Profile | Glassdoor"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/employers/getEmployerById/" + id )
                .then( ( res ) => {
                    console.log(res)
                    if ( res.status === 200 ) {
                        this.setState( {
                            employer_id:res.data._id,
                            name:   res.data.name,
                            email:  res.data.email,
                            address: res.data.address,
                            profileImageUrl: res.data.profileImageUrl,
                            website: res.data.website,
                            companySize: res.data.companySize,
                            companyType:res.data.companyType,
                            revenue:  res.data.revenue,
                            headquarter:res.data.headquarter,
                            industry:res.data.industry,
                            founded:res.data.founded,
                            mission:res.data.mission,
                            ceoname:res.data.ceoname,
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

      
    }

    editProfile = ( e ) => {
        e.preventDefault()
        //console.log("Popup called")
        let popup = document.getElementById( "edit-profile-popup" )
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
        // let redirectToProfile = null
        // if ( this.state.updateProfileButton ) {
        //     redirectToProfile = <Redirect to="/students/profile" />
        // }
        return (
            <div className="employer-profile-wrapper">
                {redirectVar}
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.profileImageUrl } alt="profile"/>
                        {/* <img className="cover" src={cover} alt="Cover"  /> */}
                    </div>
                    <div className="details-wrapper">
                            <div className="employer-company-logo">
                                <img className="logo" src={logo} alt="logo"/>
                            </div>
                        <div className="details">
                            <h3 style={{marginTop:"10px"}}> {this.state.name } </h3>
                            {/* <h3>{this.state.name}</h3> */}
                            {/* <h6 color="#404040">Part of <a href="microsoft.com">Microsoft</a></h6> */}
                            {/* <h6 color="#404040">Part of <a href="microsoft.com">{this.state.parentCompany}</a></h6> */}
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
                            
                            <div >
                            <button onClick={this.clickProfileButton} className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"280px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>+ Profile Picture
                           
                            </button>
                            <input type="file" className="hide" id="employer-profile-picture" style={{display:"none"}} onChange={this.changeProfilePicture} />
                            </div>
                            
                            <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"10px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}> + Add Logo</button>
                        </div>
                    </div>   
                    <div className="info-wrapper">
                    
                    <p style={{fontSize:"20px", lineHeight:"27px"}}>{this.state.name } Overview</p>
                    <br/>
                    <div className=" row info-wrapper-row">
                            <div className="col-6 single-row">
                                <span className="span-info"> Website:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.website}
                               
                            </div>
                               
                            <div className="col-6 single-row">
                                <span className="span-info"> Headquarters:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.headquarter}
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> Size:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {this.state.companySize}   
                            </div>
                               
                            <div className="col-6 single-row">
                                <span className="span-info"> Founded:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.founded}          
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> Type:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.companyType}       
                            </div>
                               
                            <div className="col-6 single-row">
                                <span className="span-info"> Industry:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.industry}        
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> Revenue:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.revenue}   
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> CEO name:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.ceoname}
                            </div>
                            <div className="col-6 single-row">
                                <span className="span-info"> Address:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.address}
                            </div>

                    </div>
                    {/* <br/> */}
                    {/* <div className="single-row">
                        <span style={{fontWeight:"bold",  color:"#5D5D5D"}}> Competitors:</span>  
                            New Work SE, Monster Worldwide   &nbsp; &nbsp;  
                        <svg class="SVGInline-svg mr-xsm-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14"><path fill="#1861BF" d="M7.01 9H0v2h7.01v3L11 10 7.01 6v3zm5.98-1V5H20V3h-7.01V0L9 4l3.99 4z" id="comparisonIcon-prefix__compare" stroke="currentColor"></path></svg>
                    </div> */}
{/* 
                        LinkedIn is the world’s largest professional network, with nearly 690+ million members in over 200 countries and territories around the world. LinkedIn was built to help professionals achieve more in their careers, and every day our members use our products to make connections, discover opportunities, and gain insights.
                        {/* Info */}
{/* 
                        <br/> */} 
                        {/* <br/> */}
                        <span style={{fontWeight:"bold", color:"#5D5D5D"}}> Mission:</span> {this.state.mission} 
                          
                    </div> 

                    <div className="form-wrapper-side">
                    <button onClick={this.editProfile} className = "emp-profile-btn btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"20px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191),",  }}>+ Edit Profile</button>
                    <EditProfile key={Math.random()} employer = {this.state}/>
                    </div>     
                </div>
                
            </div>
        )
    }
}
export default EmployerProfile;
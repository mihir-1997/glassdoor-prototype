import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import './EmployerProfile.css'
import EditProfile from './EditProfile'
// import cover from '../../../Images/employer.png'
//import logo from '../../../Images/linkedin-logo.png'
import SEO from '../../SEO/SEO'


import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import { Link } from 'react-router-dom';
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
            logoImageUrl:"",
            website:"",
            companySize:"",
            companyType:"",
            revenue:"",
            headquarter:"",
            industry:"",
            founded:"",
            mission:"",
            ceoname:"",
            isStudent: false

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

    changeLogoPicture = (e) =>{
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
            console.log("logo called")
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/employers/updateEmployerLogo/" + id, formData, config )
                .then( ( res ) => {
                    console.log(res)
                    if ( res.status === 200 ) {
                        this.setState( {
                            logoImageUrl: res.data.logoImageUrl
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

    clickLogoButton = (e) =>{
        e.preventDefault();
        console.log("logo button clicked")
        
        let inp = document.getElementById('employer-logo-picture')
        console.log(inp)
        inp.click()
    }

    componentDidMount () {
        SEO( {
            title: "Employer Profile | Glassdoor"
        } )
        let id = null
        if (this.props.location) {
            if (this.props.location.state) {
                id = this.props.location.state.employerID
                this.setState({
                    isStudent: true
                })
            } else {
                id = localStorage.getItem( "id" )
            }
        } else {
            id = localStorage.getItem( "id" )
        }
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
                            logoImageUrl: res.data.logoImageUrl,
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
                            <img className="logo" src={  BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.logoImageUrl} alt="logo"/>
                            </div>
                        <div className="details">
                            <h3 style={{marginTop:"10px"}}> {this.state.name } </h3>
                            <br/>
                            <br/>
                        </div>
                        <div className="row multiple-links">
                            {this.state.isStudent ?
                                <div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={{pathname:"/employer/profile", state: { employerID: this.state.employer_id  } }} >Overview</Link> </div> 
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={{pathname:"/employer/reviews", state: { employerID: this.state.employer_id, employerName: this.state.name } }} >Reviews</Link> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={{pathname:"/employer/jobs", state: { employerID: this.state.employer_id, employerName: this.state.name } }} >Jobs</Link> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={{pathname:"/employer/salaries", state: { employerID: this.state.employer_id, employerName: this.state.name } }} >Salaries</Link> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={{pathname:"/employer/interviews", state: { employerID: this.state.employer_id, employerName: this.state.name } }} >Interviews</Link> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={{pathname:"/employer/photos", state: { employerID: this.state.employer_id, employerName: this.state.name } }} >Photos</Link></div>
                                    {localStorage.getItem("active") === "admin"?
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={ { pathname: "/employer/reports", state: { employerID: this.state.employer_id, employerName: this.state.name } } } >Reports</Link> </div>
                                    :
                                    null}
                                </div>
                                    :
                                <div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><a href="/employer/profile">Overview</a> </div> 
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><a href="/employer/reviews">Reviews</a> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><a href="/employer/jobs">Jobs</a> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><a href="/employer/salaries">Salaries</a> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><a href="/employer/interviews">Interviews</a> </div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><a href="/employer/photos">Photos</a></div>
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><a href="/employer/reports">Reports</a> </div>
                                </div>
                            }   
                            
                            {this.state.isStudent ?
                                null:
                                <div >
                                <button onClick={this.clickProfileButton} className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"200px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>+ Profile Picture
                            
                                </button>
                                <input type="file" className="hide" id="employer-profile-picture" style={{display:"none"}} onChange={this.changeProfilePicture} />
                                </div>
                            }
                            {this.state.isStudent ?
                                null :

                                <div>
                                
                                <button onClick={this.clickLogoButton} className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"10px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}> + Add Logo</button>
                                <input type="file" className="hide" id="employer-logo-picture" style={{display:"none"}} onChange={this.changeLogoPicture} />
                                </div>
                            }
                            
                        </div>
                    </div>   
                    <div className="employer-profile-info-wrapper">
                    <div className="row">
                        <div className="col-9">
                        <p style={{fontSize:"20px", lineHeight:"27px", marginLeft:"1px", fontWeight:"bolder"}}>{this.state.name } Overview</p>
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

                        <span style={{fontWeight:"bold", color:"#5D5D5D"}}> Mission:</span> {this.state.mission} 
                          
                    </div> 
                        
                        <div className="col-3">
                        <div className="">
                        {this.state.isStudent ?
                            null :
                            <div>
                            <button onClick={this.editProfile} className = "emp-profile-btn btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"60px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191),",  }}>+ Edit Profile</button>
                            <EditProfile key={Math.random()} employer = {this.state}/>
                            </div>
                        }
                        </div> 
                        </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default EmployerProfile;
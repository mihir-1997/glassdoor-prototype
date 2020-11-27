import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import IndividualReview from "./individualReview"
import './EmployerReviews.css'
import cover from '../../../Images/employer.png'
import SEO from '../../SEO/SEO'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class EmployerProfile extends Component {

    constructor( props ) {
        super( props )
        this.state ={
            reviews:[],
            logoImageUrl:"",
        }
    }

    componentDidMount () {
        SEO( {
            title: "Reviews | Glassdoor"
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
        let name = localStorage.getItem( "name" )
        if ( name ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name )
                .then( ( res ) => {
                     //console.log(res.data)
                    if ( res.status === 200 ) {
                        this.setState( {
                            reviews:res.data.review
                        } )
                        console.log(this.state.reviews)
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

    render() {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

        let allReviews = this.state.reviews.map((eachreview) => {
            if(eachreview.reviewStatus === "Approved" && !eachreview.featured){
                return (
                    <IndividualReview
                       key={Math.random()}
                       data={eachreview}
                       logo={this.state.logoImageUrl}
                    ></IndividualReview>
                  );
            }
            })

        let featuredReviews =  this.state.reviews.map((featuredReview) => {
            if(featuredReview.reviewStatus === "Approved" && featuredReview.featured){
                return (
                    <IndividualReview
                       key={Math.random()}
                       data={featuredReview}
                       logo={this.state.logoImageUrl}
                    ></IndividualReview>
                  );
            }
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
                            
                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"320px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}>Follow</button> */}
                            {/* <button className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={{marginLeft:"10px", marginBottom:"15px", marginTop:"15px", color:"rgb(24, 97, 191)", background:"white",fontWeight:"bold" ,border:"1px solid rgb(24, 97, 191)"}}> + Add Review</button> */}

                        </div>
                    </div>   
                    <div className="info-wrapper">

                    <p style={{fontSize:"20px", lineHeight:"27px"}}>Featured Reviews</p>
                    {featuredReviews}
                    <br/>
                    <p style={{fontSize:"20px", lineHeight:"27px"}}>LinkedIn Reviews</p>
                    {allReviews}
                    <hr/>
                    
                    {/* <div className="review-wrapper">

                        <div className="favourite-review">
                        <span style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"0px",display:"inline-block"}}>
                            
                            November 15, 2020
                            <span style={{marginLeft:"470px"}}>
                                
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z" fill="currentColor" fill-rule="evenodd"></path></svg> 
                        </span>
                            
                            
                        </div>
                       

                        <img className="company-logo-review" src={logo} alt="logo"/>
                        
                        <div className="review">

                        <p className="review-string">"Great company!"</p>
                        <p className="star-string"> 5.0 ★★★★★</p>
                        <br/>
                        <div className="box"></div>
                        <span >Recommends</span>
                        <span className="box"></span>
                        <span>Positive Outlook</span>
                        <span className="box"></span>
                        <span>Approves CEO</span>
                        <br/>
                        <p >Worked for the company for 5 years</p>
                            <div className="pros-cons">
                                <p style={{fontWeight: "bold"}}>Pros</p>
                                <p>Good work life balance</p>
                                <p style={{fontWeight: "bold"}}>Cons</p>
                                <p>Stagnant growth</p>

                            </div>
                        </div>
                        <hr/>
                    </div>  

                    <div className="review-wrapper">

                        <div className="favourite-review">
                        <span style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"0px",display:"inline-block"}}>
                            
                            November 15, 2020
                            <span style={{marginLeft:"470px"}}>{"                                                                        "}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z" fill="currentColor" fill-rule="evenodd"></path></svg> 
                        </span>
                            
                            
                        </div>
                       

                        <img className="company-logo-review" src={logo} alt="logo"/>
                        
                        <div className="review">

                        <p className="review-string">"Great company!"</p>
                        <p className="star-string"> 5.0 ★★★★★</p>
                        <br/>
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
                    </div> */}
                       
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
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
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name,{firstTime:true, pageSize:5,pageNumber:1} )
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

        let featuredReviews =  this.state.reviews.map((featuredReview) =>{
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
                            
                        </div>
                    </div>   
                    <div className="review-info-wrapper">
                    <p style={{fontSize:"20px", lineHeight:"27px", marginLeft:"1px"}}>Featured Reviews</p>
                    <hr/>
                    {featuredReviews}
                    <br/>
                    <p style={{fontSize:"20px", lineHeight:"27px",marginLeft:"1px"}}>LinkedIn Reviews</p>
                    {allReviews}
                    <hr/>
                       
                    </div> 

                    <div className="form-wrapper">
                    Fixed image here
                    </div>     
                </div>
                
            </div>
        )
    }
}
export default EmployerProfile;
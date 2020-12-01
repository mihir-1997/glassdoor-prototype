import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import './EmployerReviews.css'
import SEO from '../../SEO/SEO'
import Paginate from '../../Pagination'
import IndividualReview from "./individualReview"
import reviewCover from '../../../Images/reviews.png'
import reviewUs from '../../../Images/review_us.png'


import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class EmployerProfile extends Component {

    constructor( props ) {
        super( props )
        this.state ={
            reviews:[],
            logoImageUrl:"",
            featuredReviews:[],
            //pagination
            currentPage:1,
            elementsPerPage: 2,
            reviewStats:{},
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
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name,{firstTime:true, pageSize:10,pageNumber:1} )
                .then( ( res ) => {
                    //  console.log(res.data)
                    if ( res.status === 200 ) {
                        this.setState( {
                            reviews:res.data.review,
                            reviewStats: res.data.reviewStats
                        } )
                        console.log("#####",this.state.reviews)
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

        if ( name ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name,{firstTime:true, pageSize:10000000,pageNumber:1} )
                .then( ( res ) => {
                      console.log(res.data)
                      var featured = []
                     
                    if ( res.status === 200 ) {
                        
                        res.data.review.map((r)=>{
                            if(r.featured===true){
                                console.log(r)
                                featured.push(r)
                            }
                        })
                        this.setState({
                            featuredReviews:featured,
                        })
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

       // Change page
        paginate = (pageNumber) => {
            console.log("pagenumber ", pageNumber);
            
            let name = localStorage.getItem( "name" )
            if ( name ) {
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name,{firstTime:false, pageSize:2,pageNumber:pageNumber} )
                    .then( ( res ) => {
                         console.log(res.data)
                        if ( res.status === 200 ) {
                            this.setState( {
                                reviews:res.data.review,
                                // reviewStats: res.data.reviewStats
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

        };

    render() {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

        let allReviews = this.state.reviews.map((eachreview) => {
            console.log("&&&&&&&",eachreview)
            if(eachreview.reviewStatus === "Pending"){
                console.log("&&&&&&&",eachreview)
                return (
                    <IndividualReview
                       key={Math.random()}
                       data={eachreview}
                       logo={this.state.logoImageUrl}
                    ></IndividualReview>
                  );
            }
            })

        let featuredReviews =  this.state.featuredReviews.map((featuredReview) =>{
            if(featuredReview.reviewStatus === "Approved"){
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
                        <img className="cover" src={reviewCover} alt="Cover"  />
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
                        </div>
                    </div>   
                    <div className="review-info-wrapper" style={{overflowY:"auto", height:"800px"}}>
                    <p style={{fontSize:"20px", lineHeight:"27px", marginLeft:"1px", fontWeight:"bold"}}>Featured Reviews</p>
                    <hr/>
                    {featuredReviews}
                    <br/>
                    <p style={{fontSize:"20px", lineHeight:"27px",marginLeft:"1px",fontWeight:"bold"}}>{localStorage.getItem("name")} Reviews</p>
                    {allReviews}
                    <Paginate 
                        elementsPerPage= {this.state.elementsPerPage}
                        totalElements={this.state.reviewStats.totalCount}
                        paginate={this.paginate}
                    />
                        
                    <hr/>
                       
                    </div> 

                    <div className="review-form-wrapper">
                        <img src={reviewUs} style={{width:"100%"}} alt="Review Us"/>
                    </div>     
                </div>
                
            </div>
        )
    }
}
export default EmployerProfile;
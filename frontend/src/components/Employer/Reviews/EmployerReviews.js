import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import { Link } from 'react-router-dom';

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
        this.state = {
            reviews: [],
            logoImageUrl: "",
            featuredReviews: [],
            employerName: "",
            employer_id: "",
            redirectToAddContribution: false,
            //pagination
            currentPage: 1,
            elementsPerPage: 4,
            reviewStats: {},
            totalCount: 0
        }
    }

    componentDidMount () {
        SEO( {
            title: "Reviews | Glassdoor"
        } )

        let name = null
        let id = null
        let isStudent = false
        if ( this.props.location ) {
            if ( this.props.location.state ) {
                name = this.props.location.state.employerName
                id = this.props.location.state.employerID
                isStudent = true
                this.setState( {
                    isStudent: true,
                } )
            } else {
                name = localStorage.getItem( "name" )
                id = localStorage.getItem( "id" )
            }
        } else {
            name = localStorage.getItem( "name" )
            id = localStorage.getItem( "id" )
        }
        console.log( id )
        this.setState( {
            employerName: name,
            employer_id: id
        } )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/employers/getEmployerById/" + id )
                .then( ( res ) => {
                    //console.log(res)
                    if ( res.status === 200 ) {
                        this.setState( {
                            logoImageUrl: res.data.logoImageUrl,
                            employer_id: res.data._id
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

        if ( isStudent && localStorage.getItem( "active" ) === "admin" ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/analytics/getReviewsbyEmployer/" + name, { firstTime: true, pageSize: 3, pageNumber: 1 } )
                .then( ( res ) => {
                    // console.log("******",res.data)
                    if ( res.status === 200 ) {
                        this.setState( {
                            reviews: res.data.review,
                            reviewStats: res.data.reviewStats
                        } )
                        console.log( "#####", res.data )

                        var featured = []

                        if ( res.status === 200 ) {

                            res.data.review.map( ( r ) => {
                                if ( r.featured === true ) {
                                    console.log( r )
                                    featured.push( r )
                                }
                            } )

                            this.setState( {
                                featuredReviews: featured,
                                totalCount: res.data.reviewStats.totalCount - featured.length

                            } )
                        }
                        console.log( "featured", featured )
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
        } else {
            if ( name ) {
                console.log( name )
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name, { firstTime: true, pageSize: 4, pageNumber: 1 } )
                    .then( ( res ) => {
                        // console.log("******",res.data)
                        if ( res.status === 200 ) {
                            this.setState( {
                                reviews: res.data.review,
                                reviewStats: res.data.reviewStats
                            } )
                            console.log( "#####", res.data )

                            var featured = []

                            if ( res.status === 200 ) {

                                res.data.review.map( ( r ) => {
                                    if ( r.featured === true ) {
                                        console.log( r )
                                        featured.push( r )
                                    }
                                } )

                                this.setState( {
                                    featuredReviews: featured,
                                    totalCount: res.data.reviewStats.totalCount - featured.length

                                } )
                            }
                            console.log( "featured", featured )
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

        // if ( name ) {
        //     axios.defaults.withCredentials = true
        //     axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        //     axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name,{firstTime:true, pageSize:10000000,pageNumber:1} )
        //         .then( ( res ) => {
        //               console.log(res.data)
        //               var featured = []

        //             if ( res.status === 200 ) {

        //                 res.data.review.map((r)=>{
        //                     if(r.featured===true){
        //                         console.log(r)
        //                         featured.push(r)
        //                     }
        //                 })
        //                 this.setState({
        //                     featuredReviews:featured,
        //                 })
        //             }
        //         } )
        //         .catch( ( err ) => {
        //             if ( err.response ) {
        //                 if ( err.response.status === 404 ) {
        //                     console.log( err.response.message )
        //                 } else if ( err.response.status === 400 ) {
        //                     console.log( " " + err.response.message )
        //                 }
        //             }
        //         } )
        // }

    }

    addReview = ( e ) => {
        e.preventDefault()
        this.setState( {
            redirectToAddContribution: true
        } )
    }

    // Change page
    paginate = ( pageNumber ) => {
        console.log( "pagenumber ", pageNumber );
        let name = this.state.employerName
        if ( this.state.isActive ) {
            if ( localStorage.getItem( "active" ) === "admin" ) {
                axios.defaults.withCredentials = true
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/analytics/getReviewsbyEmployer/" + name, { firstTime: false, pageSize: 4, pageNumber: pageNumber } )
                    .then( ( res ) => {
                        console.log( res.data )
                        if ( res.status === 200 ) {
                            this.setState( {
                                reviews: res.data.review,
                                // reviewStats: res.data.reviewStats
                            } )
                            console.log( this.state.reviews )
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

        if ( name ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getReviewsbyEmployer/" + name, { firstTime: false, pageSize: 4, pageNumber: pageNumber } )
                .then( ( res ) => {
                    console.log( res.data )
                    if ( res.status === 200 ) {
                        this.setState( {
                            reviews: res.data.review,
                            // reviewStats: res.data.reviewStats
                        } )
                        console.log( this.state.reviews )
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

    render () {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

        if ( this.state.redirectToAddContribution ) {
            redirectVar = <Redirect to="/students/addcontribution" />
        }

        let allReviews = this.state.reviews.map( ( eachreview ) => {
            console.log( "&&&&&&&", eachreview )
            if ( localStorage.getItem( "active" ) === "admin" && eachreview.featured !== true ) {
                return (
                    <IndividualReview
                        key={ Math.random() }
                        data={ eachreview }
                        logo={ this.state.logoImageUrl }
                    ></IndividualReview>
                );
            } else if ( eachreview.reviewStatus === "Approved" && eachreview.featured !== true ) {
                console.log( "&&&&&&&", eachreview )
                return (
                    <IndividualReview
                        key={ Math.random() }
                        data={ eachreview }
                        logo={ this.state.logoImageUrl }
                    ></IndividualReview>
                );
            }
        } )

        let featuredReviews = this.state.featuredReviews.map( ( featuredReview ) => {
            if ( featuredReview.featured === true ) {
                return (
                    <IndividualReview
                        key={ Math.random() }
                        data={ featuredReview }
                        logo={ this.state.logoImageUrl }
                    ></IndividualReview>
                );
            }
        } )

        return (
            <div className="employer-profile-wrapper">
                {redirectVar }
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={ reviewCover } alt="Cover" />
                    </div>
                    <div className="details-wrapper">
                        <div className="employer-company-logo">
                            <img className="logo" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.state.logoImageUrl } alt="logo" />
                        </div>
                        <div className="details">
                            <h3 style={ { marginTop: "10px" } }> { this.state.employerName } </h3>
                            <br />
                            <br />
                        </div>
                        <div className="row multiple-links">
                            { this.state.isStudent ?
                                <div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/profile", state: { employerID: this.state.employer_id } } } >Overview</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/reviews", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Reviews</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/jobs", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } > Jobs</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/salaries", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Salaries</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/interviews", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Interviews</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/photos", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Photos</Link></div>
                                    { localStorage.getItem( "active" ) === "admin" ?
                                        <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/reports", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Reports</Link> </div>
                                        :
                                        null }
                                </div>
                                :
                                <div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/profile">Overview</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/reviews">Reviews</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/jobs">Jobs</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/salaries">Salaries</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/interviews">Interviews</a> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/photos">Photos</a></div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><a href="/employer/reports">Reports</a> </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="review-info-wrapper" style={ {} }>
                        <p style={ { fontSize: "20px", lineHeight: "27px", marginLeft: "1px", fontWeight: "bold" } }>Featured Reviews</p>
                        <hr />
                        { featuredReviews }
                        <br />
                        <p style={ { fontSize: "20px", lineHeight: "27px", marginLeft: "1px", fontWeight: "bold" } }>{ this.state.employerName } Reviews</p>
                        <hr />
                        { allReviews }
                        <Paginate
                            elementsPerPage={ this.state.elementsPerPage }
                            totalElements={ this.state.totalCount }
                            paginate={ this.paginate }
                        />

                        <hr />

                    </div>

                    <div className="review-form-wrapper">
                        { console.log( localStorage.getItem( "active" ) ) }
                        { localStorage.getItem( "active" ) === "admin" ?
                            null
                            :
                            this.state.isStudent ?
                                <button onClick={ this.addReview } className="col-1.2 btn btn-primary d-flex justify-content-center align-items-center" style={ { marginLeft: "100px", marginBottom: "15px", marginTop: "15px", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)" } }>+ Add Review</button>
                                :
                                null
                        }
                        <img src={ reviewUs } style={ { width: "100%" } } alt="Review Us" />
                    </div>
                </div>

            </div>
        )
    }
}
export default EmployerProfile;
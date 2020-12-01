import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import './AdminDashboard.css'
import SEO from '../../SEO/SEO'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import Linechart from '../../Charts/Linechart/Linechart'
import Barchart from '../../Charts/Barchart/Barchart'
import VerticalBarchart from '../../Charts/Barchart/VerticalBarchart'
import WordCloud from '../../Charts/WordCloud/WordCloud'
import Bubblechart from '../../Charts/BubbleChart/Bubblechart'

class AdminDashboard extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            reviewsPerDay: [],
            mostReviewedCompanies: [],
            mostReviewesByStudents: [],
            ceoRatings: [],
            companiesAvgRatings: {}
        }
    }

    componentDidMount () {
        SEO( {
            title: "Glassdoor Analytics"
        } )
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/analytics/reviewsPerDay" )
                .then( async ( res ) => {
                    if ( res.status === 200 ) {
                        console.log( res.data )
                        // format review data for chart
                        let reviewData = []
                        let date = new Date( Date.now() )
                        for ( const key in res.data.analytics.reviews_per_day ) {
                            let singleItem = {}
                            singleItem.name = date.getDate() - key + "/" + ( date.getMonth() + 1 )
                            singleItem[ "Reviews/Day" ] = res.data.analytics.reviews_per_day[ key ]
                            reviewData.splice( 0, 0, singleItem )
                        }
                        reviewData = reviewData.slice( 1, 8 )

                        // format company reviews data for chart
                        let companyReviews = []
                        let companyAvgReviews = []
                        for ( const key in res.data.analytics.reviews_by_companies ) {
                            let singleItem = {}
                            singleItem.name = key
                            singleItem[ "Reviews by Company" ] = res.data.analytics.reviews_by_companies[ key ].total
                            companyReviews.push( singleItem )
                            companyAvgReviews.push( { name: key, value: res.data.analytics.reviews_by_companies[ key ].average_rating } )
                        }
                        companyReviews = companyReviews.sort( ( a, b ) => {
                            return b[ "Reviews by Company" ] - a[ "Reviews by Company" ]
                        } )

                        // format student reviews for chart
                        let studentData = await this.dataForStudentReviews( res.data.analytics.reviews_by_students )

                        // format CEO raings for chart
                        this.dataForCEO( res.data.analytics.ceo_rating )

                        // format companies avg raings for chart
                        companyAvgReviews = companyAvgReviews.sort( ( a, b ) => {
                            return b.value - a.value
                        } )

                        // set state for chart data
                        this.setState( {
                            reviewsPerDay: reviewData,
                            mostReviewedCompanies: companyReviews.slice( 0, 5 ),
                            companiesAvgRatings: { name: "root", children: companyAvgReviews },
                            mostReviewesByStudents: studentData
                        } )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( "Error! No user" )
                            this.setState( { "error": "No user found" } )
                        } else if ( err.response.status === 401 ) {
                            this.setState( { "error": "Wrong Password" } )
                        } else if ( err.response.status === 400 ) {
                            this.setState( { "error": "Each field is required" } )
                        }
                    }
                } )
        } else {
            console.log( "No ID found in localstorage" )
        }
    }

    getAllStudents = ( id ) => {
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        return axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/students/getUser/" + id )
            .then( ( res ) => {
                if ( res.status === 200 ) {
                    return res.data.name
                }
            } )
            .catch( ( err ) => {
                if ( err.response ) {
                    if ( err.response.status === 404 ) {
                        console.log( "Error! No user" )
                        this.setState( { "error": "No user found" } )
                    } else if ( err.response.status === 401 ) {
                        this.setState( { "error": "Wrong Password" } )
                    } else if ( err.response.status === 400 ) {
                        this.setState( { "error": "Each field is required" } )
                    }
                }
            } )
    }

    dataForStudentReviews = async ( reviews_by_students ) => {
        if ( reviews_by_students ) {
            let studentReviews = []
            let array_reviews_by_students = []
            for ( const key in reviews_by_students ) {
                array_reviews_by_students.push( { studentID: key, numOfReviews: reviews_by_students[ key ] } )
            }
            array_reviews_by_students = array_reviews_by_students.sort( ( a, b ) => {
                return b.numOfReviews - a.numOfReviews
            } )
            if ( array_reviews_by_students.length > 5 ) {
                array_reviews_by_students = array_reviews_by_students.split( 0, 5 )
            }
            for ( let i = 0; i < array_reviews_by_students.length; i++ ) {
                let singleItem = {}
                singleItem.name = await this.getAllStudents( array_reviews_by_students[ i ].studentID )
                singleItem[ "Reviews by Student" ] = array_reviews_by_students[ i ].numOfReviews
                studentReviews.push( singleItem )
            }
            return studentReviews
        }
    }

    dataForCEO = ( ceo_ratings ) => {
        if ( ceo_ratings ) {
            let array_ceo_ratings = []
            for ( const key in ceo_ratings ) {
                array_ceo_ratings.push( { text: key, value: ( ceo_ratings[ key ].positive / ceo_ratings[ key ].total ) * 100 } )
            }
            array_ceo_ratings = array_ceo_ratings.sort( ( a, b ) => {
                return b.value - a.value
            } )
            if ( array_ceo_ratings.length > 10 ) {
                array_ceo_ratings = array_ceo_ratings.split( 0, 10 )
            }
            this.setState( {
                ceoRatings: array_ceo_ratings
            } )
        }
    }

    dataForCompaniesAvgRatings = ( reviews_by_companies ) => {
        if ( reviews_by_companies ) {
            let array_reviews_by_companies = []
            for ( const key in reviews_by_companies ) {
                array_reviews_by_companies.push( { name: key, value: reviews_by_companies[ key ].average_rating } )
            }
            array_reviews_by_companies = array_reviews_by_companies.sort( ( a, b ) => {
                return b.value - a.value
            } )
            console.log( array_reviews_by_companies )
            if ( array_reviews_by_companies.length > 5 ) {
                array_reviews_by_companies = array_reviews_by_companies.split( 0, 5 )
            }
            console.log( array_reviews_by_companies )
            let out = {
                "name": "root"
            }
            out.children = array_reviews_by_companies
            console.log( out )
            return out
        }
    }

    render () {
        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        console.log( this.state )
        return (
            <div>
                {redirectVar }
                <div className="admin-dashboard">
                    <div className="admin-dashboard-heading">
                        Analytics Dashboard
                    </div>
                    <div className="admin-dashboard-row">
                        <div className="admin-dashboard-col-5">
                            <div className="vertically-aligned-div">
                                R<br />E<br />V<br />I<br />E<br />W<br />S
                            </div>
                        </div>
                        <div className="admin-dashboard-col-95">
                            <div className="admin-reviews-wrapper">
                                <Linechart key={ Math.random() } dataKey="Reviews/Day" data={ this.state.reviewsPerDay } />
                                <Barchart key={ Math.random() } dataKey="Reviews by Company" data={ this.state.mostReviewedCompanies } />
                                <VerticalBarchart key={ Math.random() } dataKey="Reviews by Student" data={ this.state.mostReviewesByStudents } />
                            </div>
                        </div>
                    </div>
                    <div className="admin-dashboard-second-row">
                        <div className="admin-dashboard-col-5">
                            <div className="vertically-aligned-div">
                                R<br />A<br />T<br />I<br />N<br />G<br />S
                            </div>
                        </div>
                        <div className="admin-dashboard-col-95-wrapper">
                            <div className="admin-dashboard-col-95 row admin-ratings-wrapper">
                                <div className="col-7">
                                    <WordCloud key={ Math.random() } data={ this.state.ceoRatings } />
                                </div>
                                <div className="col-5">
                                    <Bubblechart key={ Math.random() } data={ this.state.companiesAvgRatings } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default AdminDashboard;
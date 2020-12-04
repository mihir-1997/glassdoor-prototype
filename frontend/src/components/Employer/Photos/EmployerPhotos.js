import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import { CardColumns, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import SEO from '../../SEO/SEO'
import './EmployerPhotos.css'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import photoCover from '../../../Images/Office.jpg'

class EmployerPhotos extends Component {

    constructor( props ) {
        SEO( {
            title: "Photos | Glassdoor"
        } )

        super( props )
        this.state = {
            photos: [],
            pictures: [],
            logoImageUrl: "",
            employerName: "",
            employer_id: "",
        }
    }

    componentDidMount () {
        SEO( {
            title: "Photos | Glassdoor"
        } )

        let name = null
        let id = null
        if ( this.props.location ) {
            if ( this.props.location.state ) {
                name = this.props.location.state.employerName
                id = this.props.location.state.employerID
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

        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getPhotosByEmployer/" + name, { "firstTime": true, "pageNumber": 1, "pageSize": 100 } )
            .then( ( res ) => {

                if ( res.status === 200 ) {
                    //console.log(res)
                    this.setState( {
                        photos: res.data.photos
                    } )

                    const pictures = [];

                    this.state.photos.map( ( photo ) => {
                        //console.log(photo)
                        photo.photos.map( ( p ) => {
                            if ( p.photoStatus === "Approved" ) {
                                // console.log(p)
                                pictures.push( p )
                            }

                        } )
                    } )
                    this.setState( {
                        pictures: pictures
                    } )

                    console.log( this.state.pictures )

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


    render () {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

        return (

            <div className="employer-profile-wrapper">
                {redirectVar }
                <div className="root-header">
                    <div className="image-wrapper">
                        <img className="cover" src={ photoCover } alt="Cover" />
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
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/jobs", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Jobs</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/salaries", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Salaries</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/interviews", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Interviews</Link> </div>
                                    <div style={ { display: "inline-block" } } className="col-1.2 single-link"><Link to={ { pathname: "/employer/photos", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Photos</Link></div>
                                    {localStorage.getItem("active") === "admin"?
                                    <div style={{display:"inline-block"}} className="col-1.2 single-link"><Link to={ { pathname: "/employer/reports", state: { employerID: this.state.employer_id, employerName: this.state.employerName } } } >Reports</Link> </div>
                                    :
                                    null}
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
                    <div className="photo-info-wrapper">
                        <p style={ { marginLeft: "1px", fontSize: "20px", lineHeight: "27px" } }> { this.state.employerName } Photos</p>
                        <hr />
                        <div className="row" style={ { margin: "2px 2px 0px 0px", height: "400px", overflowY: "auto" } }>
                            <CardColumns>
                                { this.state.pictures.map( ( pic ) => {
                                    console.log( "Inside" )
                                    return (
                                        <Card style={ { margin: "5px 2px 0px 0px" } } >
                                            <Card.Img variant="top" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/officePhotos/" + pic.photo } height="200px" width="60px" />

                                            {/* <Card.Title>Card title that wraps to a new line</Card.Title> */ }
                                            {/* <Card.Text style={ { marginLeft: "0px" } }>
                                                { pic.photo }
                                            </Card.Text> */}

                                        </Card>
                                    )
                                } ) }
                            </CardColumns>


                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default EmployerPhotos




import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import {CardColumns, CardRows,Card} from 'react-bootstrap'

import SEO from '../../SEO/SEO'
import './EmployerPhotos.css'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import photoCover from '../../../Images/Office.jpg'
import logo from '../../../Images/linkedin-logo.png'

class EmployerPhotos extends Component {

    constructor( props ) {
        SEO( {
            title: "Photos | Glassdoor"
        } )

        super( props )
        this.state = {
            photos:[],
            pictures:[],
            logoImageUrl:""
        }
    }

    componentDidMount () {
        SEO( {
            title: "Photos | Glassdoor"
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
        
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/getPhotosByEmployer/" + name,{ "firstTime":true,"pageNumber":1 ,"pageSize":100} )
            .then( ( res ) => {
                 
                if ( res.status === 200 ) {
                    //console.log(res)
                    this.setState( {                           
                        photos: res.data.photos
                    } )
                    
                    const pictures = [];    
           
                    this.state.photos.map((photo)=>{
                        //console.log(photo)
                        photo.photos.map((p)=>{
                            if(p.photoStatus === "Approved"){
                                 // console.log(p)
                                 pictures.push(p)
                            }
                           
                        })
                    })
                    this.setState( {                           
                        pictures: pictures
                    } )

                    console.log(this.state.pictures)
        
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
 
    displayboxes = () => {
        console.log("inside for loop")
            let arr = [1,2,3,4,5]       
                arr.map(i=>{
                    console.log(i)
                    return (
                    <div className="col-4" style={{border:"1px solid black", height:"200px",margin:"3px"}}> 
                        {i}
                    </div>
                )
                })           
    }


render() {

    let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

    return(

        <div className="employer-profile-wrapper">
        {redirectVar}
        <div className="root-header">
            <div className="image-wrapper">
                <img className="cover" src={photoCover} alt="Cover"  />
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
            <div className="photo-info-wrapper">
            <p style={{marginLeft:"1px",fontSize:"20px", lineHeight:"27px"}}> {localStorage.getItem("name")} Photos</p>
            <hr/>  
                <div className="row" style={{margin:"2px 2px 0px 0px", height:"400px", overflowY:"auto"}}>
                    <CardColumns>
                        {this.state.pictures.map((pic)=>{
                        console.log("Inside")
                        return (
                        <Card  style={{margin:"5px 2px 0px 0px"}} >
                            <Card.Img variant="top" src={BACKEND_URL + ":" + BACKEND_PORT + "/public/images/officePhotos/"+ pic.photo} height="200px" width="60px" />
                            
                            {/* <Card.Title>Card title that wraps to a new line</Card.Title> */}
                            <Card.Text style={{marginLeft:"0px"}}>
                                {pic.photo}
                            </Card.Text>
                            
                        </Card>
                        )
                    })}
                    </CardColumns>    
               
              
                </div>
        </div> 
        </div>
        
    </div>

    )
    }
}

export default EmployerPhotos




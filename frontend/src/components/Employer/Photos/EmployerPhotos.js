import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import {CardColumns,Card} from 'react-bootstrap'

import SEO from '../../SEO/SEO'
import './EmployerPhotos.css'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import cover from '../../../Images/employer.png'
import logo from '../../../Images/linkedin-logo.png'

class EmployerPhotos extends Component {

    componentDidMount () {
        SEO( {
            title: "Photos | Glassdoor"
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
                <img className="cover" src={cover} alt="Cover"  />
            </div>
            <div className="details-wrapper">
                    <div className="employer-company-logo">
                        <img className="logo" src={logo} alt="logo"/>
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
                <div className="row" style={{marginLeft:"20px 20px 20px 20px"}}>
                    <CardColumns>
                        <Card style={{marginLeft:"20px 20px 20px 20px"}}>
                            <Card.Img variant="top" src={cover} height="200px" width="200px" />
                            <Card.Body>
                            <Card.Title>Card title that wraps to a new line</Card.Title>
                            <Card.Text>
                                
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={cover}/>
                            <Card.Body>
                            <Card.Title>Card title that wraps to a new line</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <Card.Title>Card title that wraps to a new line</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <Card.Title>Card title that wraps to a new line</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <Card.Title>Card title that wraps to a new line</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardColumns>    
                {this.displayboxes()}
                </div>
        </div> 
        </div>
        
    </div>

    )
    }
}

export default EmployerPhotos




import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios"
import {Card, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './EmployerReports.css'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
import salaryCover from '../../../Images/employer.png'
import SEO from '../../SEO/SEO'

class EmployerReports extends Component {

    constructor( props ) {
        SEO( {
            title: "Salaries | Glassdoor"
        } )

        super( props )
        this.state = {
            logoImageUrl:"",
            reports:[],
            isStudent: false,
            employerName: "",
            employer_id: ""
        }
    }
    componentDidMount () {
        SEO( {
            title: "Reports | Glassdoor"
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
        axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/jobs/getJobsReport/" + id )
            .then( ( res ) => {
                 console.log(res)
                if ( res.status === 200 ) {
                    
                    this.setState( {                           
                        reports: res.data
                    } )
                    console.log("****", this.state.reports)
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

render() {
   
    let IndividualReport = (key,obj) =>{
        return(
            <div key={key} style={{ padding:"1px", marginBottom:"2px"}}>
               <Card style={{ border:"1px solid black",width: '65rem' }}>
                <Card.Body>
                    <Card.Title style={{textAlign:"center", fontWeight:"bold"}}>{obj.jobName} | Total Applicants: {obj.total}</Card.Title>
                    <hr/>
                    <div className="row">
                        <div className="col-3">
                            <p style={{marginLeft:"50px"}}>Job Status</p>
                            <table>
                            <tr>
                                <th>Field</th>
                                <th>Statistics</th>
                            </tr>
                            <tr>
                                <td>Hired</td>
                                <td>{obj.hired}</td>
                            </tr>
                            <tr>
                                <td>Rejected</td>
                                <td>{obj.rejected}</td>
                            </tr>
                            <tr>
                                <td>In Process</td>
                                <td>{obj.inProcess}</td>
                            </tr>
                            </table>
                        </div>
                        <div className="col-3">
                            Demographics: Gender
                            <table>
                            <tr>
                                <th>Field</th>
                                <th>Statistics</th>
                            </tr>
                            <tr>
                                <td>Female</td>
                                <td>{obj.female}</td>
                            </tr>
                            <tr>
                                <td>Male</td>
                                <td>{obj.male}</td>
                            </tr>
                            </table>
                        </div>
                        <div className="col-3">
                            Demographics: Ethinicity
                            <table>
                            <tr>
                                <th>Field</th>
                                <th>Statistics</th>
                            </tr>
                            <tr>
                                <td>White</td>
                                <td>{obj.White}</td>
                            </tr>
                            <tr>
                                <td>Black</td>
                                <td>{obj.Black}</td>
                            </tr>
                            <tr>
                                <td>Asian</td>
                                <td>{obj.SouthAsian}</td>
                            </tr>
                            </table>
                        </div>
                        <div className="col-3">
                            Demographics: Miscellineous
                            <table>
                            <tr>
                                <th>Field</th>
                                <th>Statistics</th>
                            </tr>
                            <tr>
                                <td>Veteran</td>
                                <td>{obj.veterans}</td>
                            </tr>
                            <tr>
                                <td>Disability</td>
                                <td>{obj.disabled}</td>
                            </tr>
                            </table>
                        </div>
                    </div>
                </Card.Body>
            </Card>
                  
            </div>                   
           
        )
    }

    let displayReports =() =>{
        console.log("Inside")
        const phrase = [];
        for (var key in this.state.reports) {
            var obj = this.state.reports[key];
            //console.log(key,obj)
            
            if(key !== "0"){
                console.log(key,obj)
                phrase.push(IndividualReport(key,obj))
                continue;
            }
            
      
        }
        console.log("phrase", phrase)
        return phrase
    }
    
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
                <img className="cover" src={salaryCover} alt="Cover"  />
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
            <div className="salary-info-wrapper">
            <p style={{marginLeft:"1px",fontSize:"30px", lineHeight:"27px", fontWeight:"bold", textAlign:"center"}}> {localStorage.getItem("name")} Job Statistics</p>
            <hr/>
            
           
             <div style={{marginBottom:"3px", overflowY:"auto", height:"500px"}}>
                {displayReports()}
            </div>
        </div> 
        </div>
        
    </div>

    )
    }
}

export default EmployerReports




import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import {CardColumns, Card} from 'react-bootstrap'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

export class individualReviews extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            status: "",
            
        }
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
        
    }
    convertDate = (old) => {
        let date = new Date(old) 
        let format_date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
         return format_date;
 
     }

     showOptions = () => {
        return (
          <select name="status" style={{fontSize:"13px", display:"inline-block", width:"145px" ,height:"30px", marginRight:"10px"}} class="form-control" onChange={this.onChange} required={true}>
            <option value="Select status" selected disabled>
            Visibility
            </option>
            <option value="Approved">Approved</option>
            <option value="Inappropriate">Inappropriate</option>
          </select>
        );
    };

    changeStatus = (reviewId) => {
        if(this.state.status!==""){
            console.log(this.state.status)
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/reviewStatus/" + reviewId , {reviewStatus:this.state.status}  )
                .then( ( res ) => {
                    //console.log(res.data)
                    if ( res.status === 200 ) {
                    
                     //console.log("changed")
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

        let printStar = (val) =>{
            let star ="";
            for(let i=0;i<val;i++){
                star += "★";
            }
            return star;
        }   
        
        return (
            <div style={{marginLeft:"400px", marginBottom:"0px"}}>
               <div key={this.props.data._id} className="review-wrapper">
                        <div className="review">
                        <div className="favourite-review">
                        <span style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"0px",marginLeft:"-20px",display:"inline-block"}}>
                            
                            {this.convertDate(this.props.data.reviewDate)}
                            <span style={{marginLeft:"520px"}}>{" "}</span>                      
                                                     
                        </span>                           
                        </div>
                        {/* <p style={{color:"#7F7F7F", fontSize:"14px", fontWeight:"normal" , marginTop:"0px",marginBottom:"0px",marginLeft:"-20px",display:"inline-block"}}> {this.convertDate(this.props.data.reviewDate)}</p> */}
                        <p className="review-string">Company: {this.props.data.employerName}</p>  
                        <p className="review-string">"{this.props.data.headline}"</p>
                        <p className="star-string"> {this.props.data.rating}.0 {printStar(this.props.data.rating)} </p>
                        <div style={{marginLeft:"-55px", marginBottom:"0px"}}>
                            {this.props.data.recommended ?  <div className="green-box-review"></div>:<div className="red-box-review"></div>}
                            <span >Recommends</span>
                            {this.props.data.approveCEO ?  <div className="green-box-review"></div>:<div className="red-box-review"></div>}
                            <span>Positive Outlook</span>
                            {this.props.data.isPositive ?  <div className="green-box-review"></div>:<div className="red-box-review"></div>}
                            <span>Approves CEO</span>
                        </div>
                            <div className="pros-cons-review">
                                <p>{this.props.data.description}</p>
                                <p >{this.props.data.employeeStatus} Employee </p>
                                
                                <p style={{fontWeight: "bold"}}>Pros</p>
                                <p>{this.props.data.pros}</p>
                                <p style={{fontWeight: "bold"}}>Cons</p>
                                <p>{this.props.data.cons}</p>
                                <p style={{fontWeight: "bold"}}>Replies</p>
                                {this.props.data.replies.map((reply) => {
                                    return <p>↳ {reply}</p>
                                })}

                            </div>
                            <br/>
                            <div className="row" style={{display:"inline-block", margin:"0px 10px 0px 10px"}}>
                                    <div style={{ display:"inline-block"}} className="col-4">
                                        
                                        <form onSubmit={this.changeStatus(this.props.data._id)}  style={{ display:"inline-block"}}>
                                            <button
                                                // type="submit"
                                                className="btn btn-primary r-flex justify-content-center align-items-center" style={{ display:"inline-block", color:"#D32323", background:"white",fontWeight:"bold" ,border:"1px solid #D32323", fontSize:"11px", textAlign: "center", verticalAlign: "middle", margin: "auto"}}
                                            >
                                                Change Status
                                            </button>
                                        </form>
                                    </div>
                                    <div style={{ display:"inline-block"}} className="col-4">
                                        {this.props.data.reviewStatus}
                                    </div>
                                    <div  style={{ display:"inline-block"}} className="col-4">

                                        {this.showOptions()}
                                    </div>
                                    <br/>
                                </div>
                            
                        </div>
                        <hr/>
                    </div> 
            </div>
        )
    }
}

export default individualReviews

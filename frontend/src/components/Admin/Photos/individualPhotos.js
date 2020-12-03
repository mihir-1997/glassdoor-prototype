import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";
import {CardColumns, Card} from 'react-bootstrap'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

export class individualPhotos extends Component {

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

    changeStatus = (objectID,photoID) => {
        
        //console.log(this.state.status)
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        if(this.state.status!==""){
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/updatePhotoStatus/" + objectID , { photoID: photoID , status:this.state.status}  )
            .then( ( res ) => {
                // console.log(res.data)
                if ( res.status === 200 ) {
                
                 console.log("changed")
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
        return (
            <div>
                <Card  style={{margin:"5px 5px 10px 5px"}}  >
                                <Card.Img variant="top" src={BACKEND_URL + ":" + BACKEND_PORT + "/public/images/officePhotos/"+ this.props.data.photo}  />
                                <hr/>
                                <Card.Text style={{margin:"0px 10px 0px 25px", fontSize:"15px"}}>
                                    <span style={{ display:"inline-block"}}>
                                        <div  style={{ display:"inline-block"}} className="col-6">
                                            Posted on {this.convertDate(this.props.data.photoDate)}
                                        </div>
                                        <div  style={{ display:"inline-block"}} className="col-6">
                                            Status: {this.props.data.photoStatus}
                                        </div>
                                    </span>
                                    {/* <div className="row" style={{display:"inline-block", margin:"0px 10px 0px 10px"}}>
                                        <div  style={{ display:"inline-block"}} className="col-6">
                                            Posted on {this.convertDate(this.props.data.photoDate)}
                                        </div>
                                        <div  style={{ display:"inline-block"}} className="col-6">
                                            Status: {this.props.data.photoStatus}
                                        </div>
                                    </div> */}
                                    
                                </Card.Text>
          
                                <div className="row" style={{display:"inline-block", margin:"0px 10px 0px 10px"}}>
                                    
                                    <div  style={{ display:"inline-block"}} className="col-6">

                                        {this.showOptions()}
                                    </div>
                                    <div style={{ display:"inline-block"}} className="col-6">
                                        
                                        <form onSubmit={this.changeStatus(this.props.data.objectID,this.props.data.photoID)}  style={{ display:"inline-block"}}>
                                            <button
                                                type="submit"
                                                className="btn btn-primary r-flex justify-content-center align-items-center" style={{ display:"inline-block", color:"#D32323", background:"white",fontWeight:"bold" ,border:"1px solid #D32323", fontSize:"11px", textAlign: "center", verticalAlign: "middle", margin: "auto"}}
                                            >
                                                Change Status
                                            </button>
                                        </form>
                                    </div>
                                    <br/>
                                    <br/>
                                </div>
                                   
                            </Card>
            </div>
        )
    }
}

export default individualPhotos


   
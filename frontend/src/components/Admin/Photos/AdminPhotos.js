import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import {CardColumns} from 'react-bootstrap'

import IndividualPhotos from './individualPhotos'
import SEO from '../../SEO/SEO'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
 

export class AdminPhotos extends Component {

    constructor( props ) {
        SEO( {
            title: "Photos | Glassdoor"
        } )
        super( props )
        this.state = {
            photos:[],
            status:""
        }
    }

    componentDidMount () {
       
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/analytics/getAllPhotos/")
        .then( ( res ) => {
             
            if ( res.status === 200 ) {
                //console.log(res)
                this.setState( {                           
                    photos: res.data
                } )
                console.log(this.state.photos)
    
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
        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

        let displayImages = this.state.photos.map((pic)=>{
            //console.log("Inside")
            return (
                <IndividualPhotos 
                data={pic}
                key={Math.random()}
                >
                </IndividualPhotos>
            );
           
            })


        return (
            <div style={{overflowX:"auto"}}>
                {redirectVar}
                <br/>
                <p style={{marginLeft:"1px",fontSize:"20px", lineHeight:"27px",textAlign:"center", fontWeight:"bold"}}> Approve Photos</p>
                <hr/>  
                <div>
                    <div className="row" style={{margin:"10px 20px 0px 10px", overflowY:"auto"}}>
                        <CardColumns>
                            {displayImages}
                        </CardColumns>    
                        </div>
                    </div>
                </div>

        )
    }
}

export default AdminPhotos

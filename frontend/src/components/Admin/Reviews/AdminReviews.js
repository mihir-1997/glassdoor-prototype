import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import Paginate from '../../Pagination'
import IndividualReviews from './individualReviews'
import SEO from '../../SEO/SEO'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'
 

export class AdminReviews extends Component {
    
    constructor( props ) {
        SEO( {
            title: "Reviews | Glassdoor"
        } )
        super( props )
        this.state = {
            reviews:[],
            status:"",

            //paginate
            elementsPerPage:5,
            currentPage:1,
            totalCount:0,
            indexOfLastElement: 5,
            indexOfFirstElement: 0,
            currentElements:[]
        }
    }
    componentDidMount () {
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/analytics/getAllReviews/")
        .then( ( res ) => {
             
            if ( res.status === 200 ) {
                console.log(res)
                
                this.setState( {                           
                    reviews: res.data,
                    currentElements:res.data.slice(this.state.indexOfFirstElement , this.state.indexOfLastElement),
                    totalCount: res.data.length
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


    // Change page
    paginate = (pageNumber) => {
        console.log("pagenumber ", pageNumber);
        
        let indexOfLastElement = pageNumber * this.state.elementsPerPage;
        let indexOfFirstElement = indexOfLastElement - this.state.elementsPerPage;
        let allElements = this.state.reviews;
        let currentElements = allElements.slice(
        indexOfFirstElement,
        indexOfLastElement
    
        );

    this.setState({
        currentPage: pageNumber,
        indexOfLastElement: indexOfLastElement,
        indexOfFirstElement: indexOfFirstElement,
        currentElements: currentElements,
        });
    };


    render() {

        let redirectVar = null
        if ( !localStorage.getItem( "active" ) ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }

        let displayReviews = this.state.currentElements.map((review)=>{
            //console.log("Inside")
            return (
                <IndividualReviews 
                data={review}
                key={Math.random()}
                >
                </IndividualReviews>
            );
           
            })

        return (
            <div style={{overflowy:"auto"}}>
                {redirectVar}
                <br/>
                <p style={{marginLeft:"1px",fontSize:"20px", lineHeight:"27px",textAlign:"center", fontWeight:"bold"}}> Approve Reviews</p>
                <hr/>  
                <div>
                    <div className="row" style={{margin:"10px 20px 0px 10px", overflowY:"auto", marginRight:"200px"}}>
                            {displayReviews}
                           
                        </div>
                       <div style={{marginLeft:"400px"}}>
                            <Paginate
                                elementsPerPage= {this.state.elementsPerPage}
                                totalElements={this.state.totalCount}
                                paginate={this.paginate}
                            />
                       </div>
                    </div>
                </div>
        )
    }
}

export default AdminReviews

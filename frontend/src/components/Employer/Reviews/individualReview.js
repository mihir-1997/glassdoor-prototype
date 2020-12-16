import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";


import './EmployerReviews.css'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'


class IndividualReview extends Component {

    constructor( props ) {
        super( props )
        this.setState( {
            reply: "",
        } )
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    addFavourite = ( e ) => {
        e.preventDefault()
        let _id = this.props.data._id
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/favouriteReview/" + _id, { favourite: true } )
            .then( ( res ) => {
                console.log( res.data )
                if ( res.status === 200 ) {
                    window.location.reload()
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

    addFeatured = ( e ) => {
        e.preventDefault()
        let _id = this.props.data._id
        axios.defaults.withCredentials = true
        axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
        axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/featureReview/" + _id, { featured: true } )
            .then( ( res ) => {
                console.log( res.data )
                if ( res.status === 200 ) {
                    window.location.reload()
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


    convertDate = ( old ) => {
        let date = new Date( old )
        let format_date = ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear()
        return format_date;

    }

    setIsShown = ( val ) => {
        if ( val === true ) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="red" fill="red" d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z" fill-rule="evenodd"></path></svg>
        }
        else {
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="black" fill="#fff" d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z" fill-rule="evenodd"></path></svg>
        }

    }

    sendReply = ( e ) => {
        console.log( "reply function" )
        let _id = this.props.data._id
        let data = {
            reviewID: this.props.data._id,
            reply: this.state.reply

        }

        if ( data ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/contributions/reply/" + _id, data )
                .then( ( res ) => {
                    console.log( res.data )
                    if ( res.status === 200 ) {
                        window.location.reload()
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

    render () {
        let favIcon = ( val ) => {

            if ( !val ) {
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="black" fill="#fff" d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z" fill-rule="evenodd"></path></svg>
            }
            else {
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="red" fill="red" d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z" fill-rule="evenodd"></path></svg>
            }

        }

        let printStar = ( val ) => {
            let star = "";
            for ( let i = 0; i < val; i++ ) {
                star += "★";
            }
            return star;
        }
        return (
            <div>

                <div className="review-wrapper">

                    <div className="favourite-review">
                        <span style={ { color: "#7F7F7F", fontSize: "14px", fontWeight: "normal", marginTop: "0px", marginBottom: "0px", display: "inline-block" } }>

                            { this.convertDate( this.props.data.reviewDate ) }
                            <span style={ { marginLeft: "520px" } }>{ " " }</span>
                            <span onClick={ this.addFavourite }>{ favIcon( this.props.data.favourite ) }  </span>

                        </span>
                    </div>


                    <img className="company-logo-review" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.props.logo } alt="logo" />

                    <div className="review">

                        <p className="review-string">"{ this.props.data.headline }"</p>
                        <p className="star-string"> { this.props.data.rating }.0 { printStar( this.props.data.rating ) } </p>
                        <div style={ { marginLeft: "-55px", marginBottom: "0px" } }>
                            { this.props.data.recommended ? <div className="green-box-review"></div> : <div className="red-box-review"></div> }
                            <span >Recommends</span>
                            { this.props.data.approveCEO ? <div className="green-box-review"></div> : <div className="red-box-review"></div> }
                            <span>Positive Outlook</span>
                            { this.props.data.isPositive ? <div className="green-box-review"></div> : <div className="red-box-review"></div> }
                            <span>Approves CEO</span>
                        </div>

                        <br />
                        <div className="pros-cons-review">
                            <p>{ this.props.data.description }</p>
                            <p >{ this.props.data.employeeStatus } Employee </p>

                            <p style={ { fontWeight: "bold" } }>Pros</p>
                            <p>{ this.props.data.pros }</p>
                            <p style={ { fontWeight: "bold" } }>Cons</p>
                            <p>{ this.props.data.cons }</p>
                            <p style={ { fontWeight: "bold" } }>Replies</p>
                            { this.props.data.replies.map( ( reply ) => {
                                return <p>↳ { reply }</p>
                            } ) }

                        </div>
                        <div style={ { display: "flex", height: "30px" } }>
                            <input onChange={ this.onChange } style={ { border: "2px solid rgb(24, 97, 191)", borderRadius: "4px", width: "300px", display: "inline-block", marginLeft: "-1px", marginRight: "10px" } } type="text" name="reply" placeholder="      Reply" />
                            <button onClick={ this.sendReply } className="btn btn-primary d-flex justify-content-center align-items-center" style={ { display: "inline-block", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)", marginRight: "10px" } } >Reply</button>
                            { this.props.data.featured ?
                                " "
                                :
                                localStorage.getItem( "active" ) === "employers" ?
                                    <button onClick={ this.addFeatured } className="btn btn-primary d-flex justify-content-center align-items-center" style={ { display: "inline-block", color: "rgb(24, 97, 191)", background: "white", fontWeight: "bold", border: "1px solid rgb(24, 97, 191)" } } >Mark Featured</button>
                                    : null
                            }

                        </div>

                    </div>
                    <hr />
                </div>

            </div>
        )
    }
}


export default IndividualReview;
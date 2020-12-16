import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import jwt_decode from "jwt-decode"

import './Entry.css'
import { BACKEND_URL, BACKEND_PORT } from '../Config/Config'

class Login extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            email: "",
            password: "",
            selected: "student",
            error: ""
        }
    }

    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } )
    }

    radioChange = e => {
        this.setState( {
            selected: e.target.value
        } )
    }

    login = e => {
        e.preventDefault()
        if ( this.state.email && this.state.password ) {
            if ( this.state.selected === "admin" ) {
                const admin = {
                    userName: this.state.email,
                    password: this.state.password,
                }
                axios.defaults.withCredentials = true
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/analytics/loginAdmin", admin )
                    .then( ( res ) => {
                        console.log( res )
                        if ( res.status === 200 ) {
                            console.log( "loggedin successfully" )
                            localStorage.setItem( "token", res.data )
                            var decoded = jwt_decode( res.data.split( ' ' )[ 1 ] )
                            localStorage.setItem( "email", decoded.userName )
                            localStorage.setItem( "id", decoded.id )
                            localStorage.setItem( "active", decoded.type )
                            window.location.assign( '/admin/dashboard' )
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
                return
            }
            const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const re_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            if ( !re_email.test( this.state.email.toLowerCase() ) ) {
                this.setState( {
                    error: "Please enter valid email"
                } )
                return
            } else {
                this.setState( {
                    error: ""
                } )
            }
            if ( !re_password.test( this.state.password ) ) {
                this.setState( {
                    error: "Password must contain lowercase, uppercase, digits and of minumim length of 8"
                } )
                return
            } else {
                this.setState( {
                    error: ""
                } )
            }
            if ( this.state.selected === "student" ) {
                const student = {
                    email: this.state.email,
                    password: this.state.password,
                }
                axios.defaults.withCredentials = true
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/students/loginUser", student )
                    .then( ( res ) => {
                        console.log( res )
                        if ( res.status === 200 ) {
                            console.log( "loggedin successfully" )
                            localStorage.setItem( "token", res.data )
                            var decoded = jwt_decode( res.data.split( ' ' )[ 1 ] )
                            localStorage.setItem( "email", decoded.email )
                            localStorage.setItem( "id", decoded.id )
                            localStorage.setItem( "name", decoded.name )
                            localStorage.setItem( "active", decoded.type )
                            window.location.assign( '/studentDashboard' )
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
            } else if ( this.state.selected === "employer" ) {
                const employer = {
                    email: this.state.email,
                    password: this.state.password,
                }
                axios.defaults.withCredentials = true
                axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/employers/loginEmployer", employer )
                    .then( ( res ) => {
                        console.log( res )
                        if ( res.status === 200 ) {
                            console.log( "loggedin successfully" )
                            localStorage.setItem( "token", res.data )
                            var decoded = jwt_decode( res.data.split( ' ' )[ 1 ] )
                            localStorage.setItem( "email", decoded.email )
                            localStorage.setItem( "id", decoded.id )
                            localStorage.setItem( "name", decoded.name )
                            localStorage.setItem( "active", decoded.type )
                            window.location.assign( '/employer/profile' )
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
        } else {
            this.setState( {
                error: "Each field is required"
            } )
        }
    }

    render () {
        let redirectVar = null
        if ( localStorage.getItem( "email" ) && localStorage.getItem( "active" ) === "students" ) {
            redirectVar = <Redirect to="/studentDashboard" />
            return redirectVar
        } if ( localStorage.getItem( "email" ) && localStorage.getItem( "active" ) === "admin" ) {
            redirectVar = <Redirect to="/admin/dashboard" />
            return redirectVar
        } else if ( localStorage.getItem( "email" ) && localStorage.getItem( "active" ) === "employers" ) {
            redirectVar = <Redirect to="/employer/profile" />
        }
        return (
            <div className="login-container-wrapper">
                { redirectVar }
                <div className="manual-container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div className="login">
                                <div className="login-tag-line">
                                    <h3>Find The Job That Fits Your Life</h3>
                                </div>
                                <div className="login-radio-buttons">
                                    <input type="radio" name="selected" onChange={ this.radioChange } value="student" required />
                                    &nbsp;<label htmlFor="student">Student</label>&nbsp;&nbsp;
                                    <input type="radio" name="selected" onChange={ this.radioChange } value="employer" required />
                                    &nbsp;<label htmlFor="employer">Employer</label>&nbsp;&nbsp;
                                    <input type="radio" name="selected" onChange={ this.radioChange } value="admin" required />
                                    &nbsp;<label htmlFor="admin">Admin</label>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <input type="email" name="email" placeholder="Email Address" onChange={ this.onChange } className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" placeholder="Password" onChange={ this.onChange } className="form-control" required />
                                    </div>

                                    <button type="submit" id="submit" className="btn login-button" onClick={ this.login }>Log In</button>
                                </form>
                                <br />
                                <Link to="/signup" className="sign-up"> Don't have account? Sign up</Link>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
                <div className="error">
                    { this.state.error }
                </div>
            </div>
        )
    }
}

export default Login;
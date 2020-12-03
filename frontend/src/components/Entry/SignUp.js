import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import './Entry.css'
import { BACKEND_URL, BACKEND_PORT } from '../Config/Config'

class SignUp extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            name: "",
            email: "",
            password: "",
            selected: "student",
            error: "",
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

    register = e => {
        e.preventDefault()
        if ( this.state.email && this.state.password ) {
            const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
                if ( this.state.name && this.state.email && this.state.password ) {
                    const student = {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                    }
                    axios.defaults.withCredentials = true
                    axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/students/registerUser", student )
                        .then( ( res ) => {
                            if ( res.status === 200 ) {
                                console.log( "User added successfully" )
                                this.setState( {
                                    error: ""
                                } )
                                window.location.assign( '/login' )
                            } else {
                                console.log( "Error creating user" )
                            }
                        } )
                        .catch( ( err ) => {
                            if ( err.response ) {
                                if ( err.response.status === 409 ) {
                                    this.setState( { "error": "User already exist" } )
                                }
                            }
                        } )
                } else {
                    this.setState( {
                        error: "*Some required fields are empty"
                    } )
                }
            } else if ( this.state.selected === "employer" ) {
                if ( this.state.name && this.state.email && this.state.password ) {
                    const employer = {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                    }
                    axios.defaults.withCredentials = true
                    axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/employers/registerEmployer", employer )
                        .then( ( res ) => {
                            if ( res.status === 200 ) {
                                console.log( "Employer added successfully" )
                                this.setState( {
                                    error: ""
                                } )
                                console.log(res)
                                window.location.assign( '/login' )
                            } else {
                                console.log( "Error creating Employer" )
                            }
                        } )
                        .catch( ( err ) => {
                            if ( err.response ) {
                                if ( err.response.status === 409 ) {
                                    this.setState( { "error": "Employer already exist" } );
                                }
                            }
                        } )
                }

                else {
                    this.setState( {
                        error: "*Some required fields are empty"
                    } )
                }
            }
        }
    }

    render () {
        let redirectVar = null
        if ( localStorage.getItem( "email" ) && localStorage.getItem( "active" ) === "students" ) {
            redirectVar = <Redirect to="/studentDashboard" />
            return redirectVar
        } else if ( localStorage.getItem( "email" ) && localStorage.getItem( "active" ) === "restaurant" ) {

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
                                        <input type="text" name="name" placeholder="Name" onChange={ this.onChange } className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" placeholder="Email Address" onChange={ this.onChange } className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" placeholder="Password" onChange={ this.onChange } className="form-control" required />
                                    </div>

                                    <button type="submit" id="submit" className="btn login-button" onClick={ this.register }>Sign Up</button>
                                </form>
                                <br />
                                <Link to="/login" className="sign-up">Already have an account? Log In</Link>
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

export default SignUp;
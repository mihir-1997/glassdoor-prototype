import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Entry.css'

class Login extends Component {
    render () {
        return (
            <div className="login-container-wrapper">
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
                                <div className="row">
                                    <p id="error">{ }</p>
                                    <p id="error">{ }</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
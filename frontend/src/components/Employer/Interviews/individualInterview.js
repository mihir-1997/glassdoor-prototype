import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";


import './EmployerInterviews.css'
import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'


class IndividualInterview extends Component {

    constructor( props ) {
        super( props )
        this.setState( {

        } )
    }

    convertDate = ( old ) => {
        let date = new Date( old )
        let format_date = ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear()
        return format_date;

    }


    render () {
        let experienceDisplay = ( value ) => {
            if ( value === "Positive" ) {
                return <div style={ { display: "inline-block" } }> <span className="green-box-interview"></span> <span>Positive Experience</span> </div>
            }
            else if ( value === "Negative" ) {
                return <div style={ { display: "inline-block" } }> <span className="red-box-interview"></span> <span>Negative Experience</span> </div>
            }
            else {
                return <div style={ { display: "inline-block" } }> <span className="yellow-box-interview"></span> <span>Neutral Experience</span> </div>
            }
        }
        let levelDisplay = ( value ) => {
            if ( value === "Easy" ) {
                return <div style={ { display: "inline-block" } }> <span className="green-box-interview"></span> <span>Easy Interview</span> </div>
            }
            else if ( value === "Hard" ) {
                return <div style={ { display: "inline-block" } }> <span className="red-box-interview"></span> <span>Hard Interview</span> </div>
            }
            else {
                return <div style={ { display: "inline-block" } }> <span className="yellow-box-interview"></span> <span>Average Interview</span> </div>
            }
        }
        return (
            <div>

                <div className="interview-wrapper">

                    <p style={ { color: "#7F7F7F", fontSize: "14px", fontWeight: "normal", marginTop: "0px", marginBottom: "8px", marginLeft: "0px" } }>{ this.convertDate( this.props.data.interviewDate ) }</p>

                    <img className="company-logo-interview" src={ BACKEND_URL + ":" + BACKEND_PORT + "/public/images/profilepics/" + this.props.logo } alt="logo" />

                    <div className="interview">

                        <p className="interview-string">{ this.props.data.jobTitle }</p>

                        <br />
                        <br />
                        <div className="span-box-interview">

                            { this.props.data.offerStatus === "Accepted" ? <span className="green-box-interview"></span> : <span className="red-box-interview"></span> }
                            { this.props.data.offerStatus === "Accepted" ? <span > Accepted Offer </span> : <span>No Offer</span> }
                            { experienceDisplay( this.props.data.overallExperience ) }
                            { levelDisplay( this.props.data.difficulty ) }
                        </div>

                        <div className="interview-values">

                            <p style={ { fontWeight: "bold" } }>Interview</p>
                            <p>{ this.props.data.description }</p>
                            <p style={ { fontWeight: "bold" } }>Interview Questions</p>
                            <p >{ this.props.data.questionAnswers[ 0 ] }</p>
                            {/* {this.props.data.questionAnswers.map((answer,index) => {
                                    if(index>0){
                                        return <p>↳ {answer}</p>
                                    }
                                   
                                })} */}

                        </div>
                    </div>
                    <hr />
                </div>


            </div>
        )
    }
}


export default IndividualInterview;
import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './Contributions.css'
import Interviews from './Interviews/Interviews'
import Photos from './Photos/Photos'
import Reviews from './Reviews/Reviews'
import Salaries from './Salaries/Salaries'

class Contributions extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            activeContribution: "salaries"
        }
    }

    componentDidMount () {
        if ( localStorage.getItem( "active" ) === "students" ) {
            if ( this.state.activeContribution ) {
                let previousActive = document.getElementById( this.state.activeContribution )
                previousActive.classList.add( "each-contribution-button-active" )
            }
        }
    }

    openContribution = ( item ) => {
        if ( this.state.activeContribution && item ) {
            let previousActive = document.getElementById( this.state.activeContribution )
            previousActive.classList.remove( "each-contribution-button-active" )
        }
        this.setState( {
            activeContribution: item
        } )
        let newActive = document.getElementById( item )
        newActive.classList.add( "each-contribution-button-active" )
        if ( item === "salaries" ) {

        } else if ( item === "reviews" ) {

        } else if ( item === "interviews" ) {

        } else if ( item === "photos" ) {

        }
    }

    render () {
        let showContribution = null
        if ( this.state.activeContribution === "salaries" ) {
            showContribution = <Salaries />
        } else if ( this.state.activeContribution === "reviews" ) {
            showContribution = <Reviews />
        } else if ( this.state.activeContribution === "interviews" ) {
            showContribution = <Interviews />
        } else if ( this.state.activeContribution === "photos" ) {
            showContribution = <Photos />
        }
        let redirectVar = null
        if ( localStorage.getItem( "active" ) !== "students" ) {
            redirectVar = <Redirect to="/login" />
            return redirectVar
        }
        return (
            <div>
                { redirectVar }
                <div className="contributions-wrapper">
                    <div className="row contributions">
                        <div className="col-3">
                            <div className="contributions-left-pane">
                                <div className="each-contribution-button" id="salaries" onClick={ () => this.openContribution( "salaries" ) }>
                                    <span>Salaries</span>
                                </div>
                                <div className="each-contribution-button" id="reviews" onClick={ () => this.openContribution( "reviews" ) }>
                                    <span>Reviews</span>
                                </div>
                                <div className="each-contribution-button" id="interviews" onClick={ () => this.openContribution( "interviews" ) }>
                                    <span>Interviews</span>
                                </div>
                                <div className="each-contribution-button" id="photos" onClick={ () => this.openContribution( "photos" ) }>
                                    <span>Photos</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            { showContribution }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contributions;
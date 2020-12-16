import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class AddContribution extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            redirectToAddContribution: null
        }
    }

    addContribution = ( e ) => {
        e.preventDefault()
        this.setState( {
            redirectToAddContribution: true
        } )
    }

    render () {
        let redirect = null
        if ( this.state.redirectToAddContribution ) {
            redirect = <Redirect to="/students/addcontribution" />
        }
        return (
            <div>
                { redirect }
                <div className="">
                    <div className="addcontribution-header">
                        { this.props.contribution.heading }
                    </div>
                    <div className="addcontribution-button">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.addContribution }>
                            { this.props.contribution.add_button }
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddContribution;
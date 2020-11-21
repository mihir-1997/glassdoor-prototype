import React, { Component } from 'react'

import './Skills.css'

class Skills extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            skills: this.props.skills
        }
    }

    render () {
        return (
            <div>
                {this.state.skills ?
                    this.state.skills.map( ( skill, index ) => {
                        return <span key={ index } className="each-skill">
                            { skill }
                        </span>
                    } )
                    : null
                }
            </div>
        )
    }
}

export default Skills;
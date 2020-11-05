import React, { Component } from 'react'

import './Skills.css'

class Skills extends Component {

    render () {
        let skills = [ "Docker", "Kubernetes", "AWS", "GCP", "Helm", "Terraform", "NodeJS", "ReactJS", "HTML", "CSS", "JavaScript", "Python" ]
        return (
            <div>
                {skills.map( ( skill, index ) => {
                    return <span key={ index } className="each-skill">
                        { skill }
                    </span>
                } ) }
            </div>
        )
    }
}

export default Skills;
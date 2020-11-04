import React, { Component } from 'react'

import './Experience.css'

class Experience extends Component {

    componentDidMount () {
    }

    showExperienceOptions = ( e ) => {
        e.preventDefault()
        let options = document.getElementById( "more-icon-option" )
        if ( options.classList.contains( "more-icon-option-show" ) ) {
            options.classList.remove( "more-icon-option-show" )
        } else {
            options.classList.add( "more-icon-option-show" )
        }
    }

    editExperience = ( e ) => {
        e.preventDefault()
    }

    deleteExperience = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div className="experience-wrapper">
                <div className="row">
                    <div className="col-1">
                        <div className="building-icon-wrapper">
                            <div className="building-icon">
                                <svg className="building-icon-svg" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                                    <path fill="#C2C2C2" d="M21 22h2v2h-22v-2h2v-22h18v22zm-10-3h-2v4h2v-4zm4 0h-2v4h2v-4zm4-17h-14v20h2v-5h10v5h2v-20zm-12 11h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-11 experience-second-col">
                        <div className="experience-title">
                            <div className="row">
                                <div className="col-10">
                                    {/* {this.props.experience_title} */ }
                                    Software Engineer(internship)
                                </div>
                                <div className="col-2">
                                    <div className="more-icon" onClick={ this.showExperienceOptions }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <defs>
                                                <path id="prefix__more-a" d="M4 14a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z"></path>
                                            </defs>
                                            <g fill="none" fillRule="evenodd">
                                                <mask id="prefix__more-b" fill="#fff">
                                                    <use href="#prefix__more-a"></use>
                                                </mask>
                                                <use fill="#000" href="#prefix__more-a"></use>
                                                <g className="more-icon-g" id="prefix__more-horizontal" fill="#858C94" mask="url(#prefix__more-b)">
                                                    <path d="M0 0h24v24H0z"></path>
                                                </g>
                                                <g className="more-icon-g-hover" id="prefix__more-horizontal" fill="#20262E" mask="url(#prefix__more-b)">
                                                    <path d="M0 0h24v24H0z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="more-icon-option-wrapper">
                                        <div className="more-icon-option" id="more-icon-option">
                                            <button className="dropdown-item" type="button" onClick={ this.editExperience } value="Edit">
                                                <svg className="basic-info-pen-svg" style={ { "width": "24px", "height": "24px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <g fill="#20262e" fillRule="evenodd">
                                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                                    </g>
                                                </svg>&nbsp;
                                            Edit</button>
                                            <button className="dropdown-item" type="button" onClick={ this.deleteExperience } value="Delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M13.67 3h-3.34a.75.75 0 00-.75.75V5h4.84V3.71a.75.75 0 00-.75-.71zM15 8a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 0115 8zM9 8a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 019 8zm3 0a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 0112 8zm6-2H6l.21 14.83a.33.33 0 00.32.25l11-.08a.33.33 0 00.32-.26zm-4.33-4a1.75 1.75 0 011.75 1.75V5h5a.53.53 0 01.56.5.54.54 0 01-.56.5H19l-.17 14.8v.07A1.34 1.34 0 0117.5 22H6.55a1.33 1.33 0 01-1.32-1.12v-.07L5 6H3.56A.54.54 0 013 5.46.53.53 0 013.56 5h5V3.71A1.75 1.75 0 0110.33 2z" fill="currentColor" fillRule="evenodd"></path>
                                                </svg>&nbsp;
                                            Delete
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="experience-company">
                            {/* {this.state.experience_company} */ }
                            Dummy
                        </div>
                        <div className="experience-location">
                            {/* {this.state.experience_location} */ }
                            San Jose, CA
                        </div>
                        <div className="experience-duration">
                            {/* {this.state.experience_duration} */ }
                            Jun 2020 - Aug 2020
                        </div>
                        <div className="experience-description">
                            {/* {this.state.experience_description} */ }
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Experience;
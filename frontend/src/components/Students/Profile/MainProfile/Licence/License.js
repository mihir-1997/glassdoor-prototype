import React, { Component } from 'react'

import './License.css'

class License extends Component {

    componentDidMount () {
    }

    showLicenseOptions = ( e ) => {
        e.preventDefault()
        let options = document.getElementById( "license-more-icon-option" )
        if ( options.classList.contains( "license-more-icon-option-show" ) ) {
            options.classList.remove( "license-more-icon-option-show" )
        } else {
            options.classList.add( "license-more-icon-option-show" )
        }
    }

    editLicense = ( e ) => {
        e.preventDefault()
    }

    deleteLicense = ( e ) => {
        e.preventDefault()
    }

    render () {
        return (
            <div className="license-wrapper">
                <div className="row">
                    <div className="col-1">
                        <div className="building-icon-wrapper">
                            <div className="building-icon">
                                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#C2C2C2" d="M14.969 9.547l.031.191c0 .193-.096.379-.264.496-.538.372-.467.278-.67.885-.084.253-.33.424-.605.424h-.002c-.664-.002-.549-.038-1.083.338-.112.08-.244.119-.376.119s-.264-.039-.376-.118c-.534-.376-.419-.34-1.083-.338h-.002c-.275 0-.521-.171-.605-.424-.203-.607-.133-.513-.669-.885-.169-.118-.265-.304-.265-.497l.031-.19c.207-.604.208-.488 0-1.094l-.031-.191c0-.193.096-.379.265-.497.536-.372.465-.277.669-.885.084-.253.33-.424.605-.424h.002c.662.002.544.041 1.083-.338.112-.08.244-.119.376-.119s.264.039.376.118c.534.376.419.34 1.083.338h.002c.275 0 .521.171.605.424.203.607.132.513.67.885.168.118.264.304.264.497l-.031.191c-.207.604-.208.488 0 1.094zm-1.469-1.198l-.465-.464-1.41 1.446-.66-.627-.465.464 1.125 1.091 1.875-1.91zm4.5 4.651h-12v1h12v-1zm-1 2h-10v1h10v-1zm1 2h-12v1h12v-1zm1-15h-19v20h24v-20h-5zm3 15.422c-1.151.504-2.074 1.427-2.578 2.578h-14.844c-.504-1.151-1.427-2.074-2.578-2.578v-10.844c1.151-.504 2.074-1.427 2.578-2.578h14.844c.504 1.151 1.427 2.074 2.578 2.578v10.844z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-11 license-second-col">
                        <div className="license-title">
                            <div className="row">
                                <div className="col-10">
                                    {/* {this.props.university_name} */ }
                                    Dummy
                                </div>
                                <div className="col-2">
                                    <div className="license-more-icon" onClick={ this.showLicenseOptions }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <defs>
                                                <path id="prefix__more-a" d="M4 14a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z"></path>
                                            </defs>
                                            <g fill="none" fillRule="evenodd">
                                                <mask id="prefix__more-b" fill="#fff">
                                                    <use href="#prefix__more-a"></use>
                                                </mask>
                                                <use fill="#000" href="#prefix__more-a"></use>
                                                <g className="license-more-icon-g" id="prefix__more-horizontal" fill="#858C94" mask="url(#prefix__more-b)">
                                                    <path d="M0 0h24v24H0z"></path>
                                                </g>
                                                <g className="license-more-icon-g-hover" id="prefix__more-horizontal" fill="#20262E" mask="url(#prefix__more-b)">
                                                    <path d="M0 0h24v24H0z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="license-more-icon-option-wrapper">
                                        <div className="license-more-icon-option" id="license-more-icon-option">
                                            <button className="dropdown-item" type="button" onClick={ this.editLicense } value="Edit">
                                                <svg className="basic-info-pen-svg" style={ { "width": "24px", "height": "24px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <g fill="#20262e" fillRule="evenodd">
                                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                                    </g>
                                                </svg>&nbsp;
                                            Edit</button>
                                            <button className="dropdown-item" type="button" onClick={ this.deleteLicense } value="Delete">
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
                        <div className="license-issue-org">
                            {/* {this.state.issue_org} */ }
                            LinkedIn
                        </div>
                        <div className="license-duration">
                            {/* {this.state.license_duration} */ }
                            Aug 2019 - May 2021
                        </div>
                        <div className="license-description">
                            {/* {this.state.license_description} */ }
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default License;
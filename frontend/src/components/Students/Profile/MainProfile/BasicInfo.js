import React, { Component } from 'react'
import axios from 'axios'

import './BasicInfo.css'
import SEO from '../../../SEO/SEO'
import AddBasicInfo from './AddBasicInfo'
import AddAboutMe from './AddAboutMe'
import Experience from './Experience/Experience'
import AddExperience from './Experience/AddExperience'
import Skills from './Skills/Skills'
import UpdateSkills from './Skills/UpdateSkills'
import Education from './Education/Education'
import AddEducation from './Education/AddEducation'

import { BACKEND_URL, BACKEND_PORT } from '../../../Config/Config'

class BasicInfo extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            name: "",
            phoneNumber: "",
            address: "",
            city: "",
            zipcode: "",
            website: "",
            aboutMe: "",
            experience: [],
            education: [],
            skills: [],
            isEmployerActive: false,
        }
    }

    componentDidMount () {
        SEO( {
            title: "User Profile | Glassdoor"
        } )
        if ( this.props.active ) {
            this.setState( {
                isEmployerActive: true
            } )
        }
        let id = null
        if ( this.props.studentID ) {
            id = this.props.studentID
        } else {
            id = localStorage.getItem( "id" )
        }
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.get( BACKEND_URL + ":" + BACKEND_PORT + "/students/getUser/" + id )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        this.setState( {
                            name: res.data.name,
                            phoneNumber: res.data.phoneNumber,
                            address: res.data.address,
                            city: res.data.city,
                            zipcode: res.data.zipcode,
                            website: res.data.website,
                            aboutMe: res.data.aboutMe,
                            experience: res.data.experience,
                            education: res.data.education,
                            skills: res.data.skills
                        } )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message )
                        }
                    }
                } )
        }
    }

    updateBasicInfo = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "basicinfo-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveBasicInfo = ( student ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/students/updateUserBasicInfo/" + id, student )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        window.location.reload()
                    } else {
                        console.log( "Error updating basic info" )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message )
                        }
                    }
                } )
        }
    }

    updateAboutMe = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "aboutme-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveAboutMe = ( aboutMe ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/students/updateUserAbout/" + id, aboutMe )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        window.location.reload()
                    } else {
                        console.log( "Error updating about me" )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message )
                        }
                    }
                } )
        }
    }

    addExperience = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "experience-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveExperience = ( experience ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/students/addUserExperience/" + id, experience )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        window.location.reload()
                    } else {
                        console.log( "Error adding experience" )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message )
                        }
                    }
                } )
        }
    }

    updateSkills = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "skills-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    addEducation = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "education-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    saveEducation = ( education ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.post( BACKEND_URL + ":" + BACKEND_PORT + "/students/addUserEducation/" + id, education )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        window.location.reload()
                    } else {
                        console.log( "Error adding education" )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message )
                        }
                    }
                } )
        }
    }

    saveSkill = ( skills ) => {
        let id = localStorage.getItem( "id" )
        if ( id ) {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
            axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/students/updateUserSkills/" + id, skills )
                .then( ( res ) => {
                    if ( res.status === 200 ) {
                        window.location.reload()
                    } else {
                        console.log( "Error adding skill" )
                    }
                } )
                .catch( ( err ) => {
                    if ( err.response ) {
                        if ( err.response.status === 404 ) {
                            console.log( err.response.message )
                        } else if ( err.response.status === 400 ) {
                            console.log( err.response.message )
                        }
                    }
                } )
        }
    }

    render () {
        let basicInfo = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            website: this.state.website,
        }
        return (
            <div className="basic-info-wrapper">
                <div className="basic-info">
                    <h3>
                        { this.state.name ?
                            this.state.name
                            :
                            localStorage.getItem( "name" ) }
                        { this.state.isEmployerActive ?
                            null :
                            <span onClick={ this.updateBasicInfo }>
                                <svg className="basic-info-pen-svg" style={ { "width": "24px", "height": "24px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g className="basic-info-pen" fill="#ccc" fillRule="evenodd">
                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                    </g>
                                    <g className="basic-info-pen-hover" fill="#20262e" fillRule="evenodd">
                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                    </g>
                                </svg>
                            </span>
                        }
                    </h3>
                    <div className="row basic-info-row">
                        <div className="col-4">
                            <div className="basic-info-each-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M16 4H8a1 1 0 00-1 1v1h10V5a1 1 0 00-1-1zm-1.5 10a.5.5 0 01.09 1H9.5a.5.5 0 010-1zM20 7H4a1 1 0 00-1 1v6a1 1 0 001 1h3.28l.5 2h8.44l.5-2H20a1 1 0 001-1V8a1 1 0 00-1-1zM6.5 16H4v3a1 1 0 001 1h14a1 1 0 001-1v-3h-2.5l-.5 2H7zM16 3a2 2 0 012 2v1h2a2 2 0 012 2v6a2 2 0 01-1 1.73V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-3.27A2 2 0 012 14V8a2 2 0 012-2h2V5a2 2 0 012-2z" fill="#20262E" fillRule="evenodd"></path>
                                </svg> &nbsp;
                                    {/* {this.state.user_title} */ }
                                    Student
                            </div>
                            <div className="basic-info-each-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19 10a7 7 0 00-14 0c0 3.484 2.298 7.071 7 10.741 4.702-3.67 7-7.257 7-10.741zm-7 12c-5.333-4-8-8-8-12a8 8 0 1116 0c0 4-2.667 8-8 12zm0-10a2 2 0 110-4 2 2 0 010 4zm0 1a3 3 0 100-6 3 3 0 000 6z" fill="#20262E" fillRule="evenodd"></path>
                                </svg> &nbsp;
                                    { this.state.city }
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="basic-info-each-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M20.42 5H3.58l7.71 7.71a1 1 0 001.42 0zM3 5.83v12.45l6.23-6.23zm18 0l-6.23 6.23L21 18.28zm-6.93 6.93l-.66.66a2 2 0 01-2.82 0l-.66-.66L3.7 19h16.6zM20.9 4A1.12 1.12 0 0122 5.14v13.72A1.13 1.13 0 0120.9 20H3.1A1.12 1.12 0 012 18.86V5.14A1.13 1.13 0 013.1 4z" fill="currentColor" fillRule="evenodd">
                                    </path>
                                </svg> &nbsp;
                                { this.state.email ?
                                    this.state.email
                                    :
                                    localStorage.getItem( "email" ) }
                            </div>
                            <div className="basic-info-each-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 22 22">
                                    <g fill="currentColor" fillRule="evenodd">
                                        <path d="M16.237 12.386c-.29-.224-.68-.386-1.237-.386-1.074-1.072-2.144-1.57-3.139-1.57-.86 0-1.665.374-2.36 1.07-.16.16-.276.222-.377.222-.35 0-.577-.722-2.124-.722-1.184 0-1.5-.797-1.5-1.5 0-1 2 0 3-1S9.586 7 11 7c1 0 1.816-2.551 1.5-3.5-.362-1.081-1.5-1.902-2.484-1.902-.38 0-.737.123-1.016.402-.5.5-1.5.75-2.5.75-.716 0-1.425-.134-1.957-.388A7.938 7.938 0 019 1c4.411 0 8 3.589 8 8a7.95 7.95 0 01-.763 3.386M12.3 16.28c-.23-.547-.663-1.055-1.093-1.487-.282-.281-.61-.445-.87-.576a20.86 20.86 0 01-.333-.166S10 14.035 10 14c0-.427-.166-.907-.446-1.351.287-.103.5-.288.653-.442.514-.513 1.072-.776 1.654-.776.756 0 1.597.44 2.432 1.276l.293.293H15c.365 0 .591.119.744.285A8.06 8.06 0 0112.3 16.28M9 17c-4.41 0-8-3.59-8-8 0-1.393.36-2.705.99-3.846.823.23 1.813.825 1.51 2.346C2.85 10.748 5 12 7 12c1 0 2 1.293 2 2 0 1 1 1 1.5 1.5.501.5.754.866.876 1.14A7.974 7.974 0 019 17M3.523 3.195c1.013.317 2.572.555 2.977.555.65 0 2.264-.1 3.207-1.043.051-.05.133-.11.31-.11.533 0 1.301.522 1.533 1.22.141.448-.299 1.862-.664 2.184-1.377.026-1.909.5-2.607 1.276-.139.15-.294.324-.486.516C7.586 8 7.075 8 6.625 8 6.048 8 4.518 8 4.5 9.472c-.154-.484-.159-1.08-.02-1.774.242-1.216-.149-2.014-.52-2.466-.2-.242-.889-.654-1.415-.943.29-.397.622-.757.978-1.094M9 0a9 9 0 000 18c.995 0 1.95-.168 2.844-.467a9.008 9.008 0 005.04-4.193A9.002 9.002 0 009 0">
                                        </path>
                                    </g>
                                </svg> &nbsp;
                                    { this.state.website }
                            </div>

                        </div>
                        <div className="col-4">
                            <div className="basic-info-each-item">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                                    <g fill="currentColor" fillRule="evenodd">
                                        <path d="M7 4a3.13 3.13 0 01.6.06l.27.07 1 5.07-1.51.85a1 1 0 00-.43 1.26 10.94 10.94 0 005.81 5.81 1.09 1.09 0 00.39.08 1 1 0 00.87-.51l.86-1.51 5.06.95a2.5 2.5 0 01.07.26A3.31 3.31 0 0120 17a3 3 0 01-3 3A13 13 0 014 7a3 3 0 013-3m0-1a4 4 0 00-4 4 14 14 0 0014 14 4 4 0 004-4 4.17 4.17 0 00-.08-.8 3.82 3.82 0 00-.33-.95l-6.3-1.19-1.21 2.14a10 10 0 01-5.28-5.28l2.13-1.2-1.18-6.31a3.82 3.82 0 00-1-.33A4.17 4.17 0 007 3z"></path>
                                    </g>
                                </svg> &nbsp;
                                { this.state.phoneNumber }
                            </div>
                        </div>
                    </div>
                    { this.state.isEmployerActive ?
                        null :
                        <AddBasicInfo key={ Math.random() } basicInfo={ basicInfo } saveBasicInfo={ this.saveBasicInfo } />
                    }
                </div>
                <div className="about-me basic-info-each-section">
                    <h3>
                        About Me
                        { this.state.isEmployerActive ?
                            null :
                            <span onClick={ this.updateAboutMe }>
                                <svg className="basic-info-pen-svg" style={ { "width": "24px", "height": "24px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g className="basic-info-pen" fill="#ccc" fillRule="evenodd">
                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                    </g>
                                    <g className="basic-info-pen-hover" fill="#20262e" fillRule="evenodd">
                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                    </g>
                                </svg>
                            </span>
                        }
                    </h3>
                    <div className="aboutme-text">
                        { this.state.aboutMe }
                    </div>
                    { this.state.isEmployerActive ?
                        null :
                        <AddAboutMe key={ Math.random() } aboutMe={ this.state.aboutMe } saveAboutMe={ this.saveAboutMe } />
                    }
                </div>
                <div className="experience basic-info-each-section">
                    <h3>
                        Experience
                        { this.state.isEmployerActive ?
                            null :
                            <span onClick={ this.addExperience }>
                                <svg className="basic-info-circle-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <g className="basic-info-circle-g" fill="none" fillRule="evenodd">
                                        <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                        <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#1861bf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    </g>
                                    <g className="basic-info-circle-g-hover" fill="none" fillRule="evenodd">
                                        <circle cx="12" cy="12" fill="#1861bf" r="12"></circle>
                                        <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#f5f6f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    </g>
                                </svg>

                            </span>
                        }
                    </h3>
                    {
                        this.state.experience ?
                            this.state.experience.map( ( experience, index ) => {
                                return <Experience key={ index } index={ index } experience={ experience } isEmployerActive={ this.state.isEmployerActive } />
                            } )
                            : null
                    }
                    { this.state.isEmployerActive ?
                        null :
                        <AddExperience saveExperience={ this.saveExperience } />
                    }
                </div>
                <div className="skills">
                    <h3>
                        Skills
                        { this.state.isEmployerActive ?
                            null :
                            <span onClick={ this.updateSkills }>
                                <svg className="basic-info-pen-svg" style={ { "width": "24px", "height": "24px" } } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g className="basic-info-pen" fill="#ccc" fillRule="evenodd">
                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                    </g>
                                    <g className="basic-info-pen-hover" fill="#20262e" fillRule="evenodd">
                                        <path d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"></path>
                                    </g>
                                </svg>
                            </span>
                        }
                    </h3>
                    {
                        this.state.skills ?
                            <Skills key={ Math.random() } skills={ this.state.skills } />
                            : null
                    }
                    { this.state.isEmployerActive ?
                        null :
                        <UpdateSkills saveSkill={ this.saveSkill } />
                    }
                </div>
                <div className="education">
                    <h3>
                        Education
                        { this.state.isEmployerActive ?
                            null :
                            <span onClick={ this.addEducation }>
                                <svg className="basic-info-circle-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <g className="basic-info-circle-g" fill="none" fillRule="evenodd">
                                        <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                        <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#1861bf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    </g>
                                    <g className="basic-info-circle-g-hover" fill="none" fillRule="evenodd">
                                        <circle cx="12" cy="12" fill="#1861bf" r="12"></circle>
                                        <path d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z" stroke="#f5f6f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    </g>
                                </svg>

                            </span>
                        }
                    </h3>
                    {
                        this.state.education ?
                            this.state.education.map( ( education, index ) => {
                                return <Education key={ index } index={ index } education={ education } isEmployerActive={ this.state.isEmployerActive } />
                            } )
                            : null
                    }
                    { this.state.isEmployerActive ?
                        null :
                        <AddEducation saveEducation={ this.saveEducation } />
                    }
                </div>
            </div>
        )
    }
}

export default BasicInfo;
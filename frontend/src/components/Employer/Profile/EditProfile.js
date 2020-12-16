import React, { Component } from 'react'
import axios from "axios";

import './EmployerProfile.css'
import Header from '../../Popup/Header'
import Footer from '../../Popup/Footer'

import { BACKEND_URL, BACKEND_PORT } from '../../Config/Config'

class EditProfile extends Component {

    constructor( props ) {
        super( props )
        this.state = {

            employer_id: this.props.employer.employer_id,
            name: this.props.employer.name,
            email: this.props.employer.email,
            address: this.props.employer.address,
            profileImageUrl: this.props.employer.profileImageUrl,
            website: this.props.employer.website,
            companySize: this.props.employer.companySize,
            companyType: this.props.employer.companyType,
            revenue: this.props.employer.revenue,
            headquarter: this.props.employer.headquarter,
            industry: this.props.employer.industry,
            founded: this.props.employer.founded,
            mission: this.props.employer.mission,
            ceoname: this.props.employer.ceoname,
        }
    }

    closePopup = () => {
        let popup = document.getElementById( "edit-profile-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveProfile = ( e ) => {
        //e.preventDefault();
        axios.defaults.withCredentials = true;
        const data = {
            _id: localStorage.getItem( "id" ),
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            website: this.state.website,
            companySize: this.state.companySize,
            companyType: this.state.companyType,
            revenue: this.state.revenue,
            headquarter: this.state.headquarter,
            industry: this.state.industry,
            founded: this.state.founded,
            mission: this.state.mission,
            ceoname: this.state.ceoname,
        }
        if ( data ) {
            let id = localStorage.getItem( "id" )
            if ( id ) {
                axios.defaults.headers.common[ 'authorization' ] = localStorage.getItem( 'token' )
                axios.put( BACKEND_URL + ":" + BACKEND_PORT + "/employers/updateEmployerBasicInfo/" + id, data )
                    .then( ( res ) => {
                        if ( res.status === 200 ) {
                            window.location.reload()
                        }
                        else {
                            console.log( "Error Updating info" )
                        }
                        //console.log("Response",res);
                    } )
                    .catch( ( err ) => {
                        if ( err.response ) {
                            if ( err.response.status === 404 ) {
                                console.log( err.response.message )
                            } else if ( err.response.status === 400 ) {
                                console.log( err.response.message + "" )
                            }
                        }
                    } )
            }
        }
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }


    render () {

        return (
            <div id="edit-profile-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Edit Employer Profile
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Name</label>
                                    <input type="text" className="form-control" name="name" defaultValue={ this.state.name } placeholder={ this.state.name } onChange={ this.onChange } />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="experienceInputTitle">Website</label>
                                    <input type="text" className="form-control" name="website" defaultValue={ this.state.website } placeholder={ this.state.website } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputCompanyName">Address</label>
                                    <input type="text" className="form-control" name="address" defaultValue={ this.state.address } placeholder={ this.state.address } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Company Size</label>
                                    <input type="text" className="form-control" name="companySize" defaultValue={ this.state.companySize } placeholder={ this.state.companySize } onChange={ this.onChange } />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Company Type</label>
                                    <input type="text" className="form-control" name="companyType" defaultValue={ this.state.companyType } placeholder={ this.state.companyType } onChange={ this.onChange } />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Revenue</label>
                                    <input type="text" className="form-control" name="revenue" defaultValue={ this.state.revenue } placeholder={ this.state.revenue } onChange={ this.onChange } />
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="experienceInputTitle">Founded</label>
                                    <input type="text" className="form-control" name="founded" defaultValue={ this.state.founded } placeholder={ this.state.founded } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="experienceInputTitle">Headquarters</label>
                                    <input type="text" className="form-control" name="headquarter" defaultValue={ this.state.headquarter } placeholder={ this.state.headquarter } onChange={ this.onChange } />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="experienceInputTitle">CEO Name</label>
                                    <input type="text" className="form-control" name="ceoname" defaultValue={ this.state.ceoname } placeholder={ this.state.ceoname } onChange={ this.onChange } />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="experienceInputTitle">Industry</label>
                                    <input type="text" className="form-control" name="industry" defaultValue={ this.state.industry } placeholder={ this.state.industry } onChange={ this.onChange } />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="experienceInputDescription">Mission</label>
                                    <textarea type="text" className="form-control" name="mission" defaultValue={ this.state.mission } placeholder="Mission" onChange={ this.onChange } />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveProfile } />
                </div>
            </div>
        )
    }
}

export default EditProfile;
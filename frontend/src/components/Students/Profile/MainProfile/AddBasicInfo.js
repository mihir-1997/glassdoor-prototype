import React, { Component } from 'react'

import Footer from '../../../Popup/Footer'
import Header from '../../../Popup/Header'

class AddBasicInfo extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            ...this.props.basicInfo
        }
    }

    onChange = ( e ) => {
        e.preventDefault()
        this.setState( {
            [ e.target.name ]: e.target.value
        } )
    }

    saveBasicInfo = ( e ) => {
        let student = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            website: this.state.website,
        }
        this.props.saveBasicInfo( student )
    }

    closePopup = () => {
        let popup = document.getElementById( "basicinfo-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    render () {
        return (
            <div id="basicinfo-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Basic Information
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="basicInfoInputName">Name</label>
                                    <input type="text" name="name" className="form-control" id="basicInfoInputName" placeholder="Name" value={ this.state.name } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="basicInfoInputAddress">Address</label>
                                    <input type="text" name="address" className="form-control" id="basicInfoInputAddress" placeholder="Address" value={ this.state.address } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="basicInfoInputCity">City</label>
                                    <input type="text" name="city" className="form-control" id="basicInfoInputCity" placeholder="City" value={ this.state.city } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="basicInfoInputZip">Zip</label>
                                    <input type="number" name="zipcode" className="form-control" id="basicInfoInputZip" placeholder="Zip" value={ this.state.zipcode } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="basicInfoInputPhoneNumber">Phone Number</label>
                                    <input type="text" name="phoneNumber" className="form-control" id="basicInfoInputPhoneNumber" placeholder="Phone Number" value={ this.state.phoneNumber } onChange={ this.onChange } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="basicInfoInputWebsite">Website</label>
                                    <input type="text" name="website" className="form-control" id="basicInfoInputWebsite" placeholder="Website" value={ this.state.website } onChange={ this.onChange } />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveChanges={ this.saveBasicInfo } />
                </div>
            </div>
        )
    }
}

export default AddBasicInfo;
import React, { Component } from 'react'

import './License.css'
import Header from '../../../../Popup/Header'
import Footer from '../../../../Popup/Footer'

class AddLicense extends Component {

    changeIssueMonth = ( e ) => {
        console.log( e.target.value )
    }

    changeExpirationMonth = ( e ) => {
        console.log( e.target.value )
    }

    closePopup = () => {
        let popup = document.getElementById( "license-popup" )
        popup.classList.remove( "popup-wrapper-show" )
    }

    saveLicense = () => {

    }

    render () {

        let selectMonth = ( label, onChange ) => {
            return <select className="custom-select" id={ label } onChange={ onChange }>
                <option value=""></option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
            </select>
        }

        return (
            <div id="license-popup" className="popup-container">
                <div className="popup-wrapper">
                    <Header closePopup={ this.closePopup } />
                    <div className="popup-body">
                        <div className="popup-title">
                            Add License
                    </div>
                        <form className="popup-form">
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="inputTitle">Title</label>
                                    <input type="text" className="form-control" id="inputTitle" placeholder="Title" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="inputIssueOrg">Issuing Organization</label>
                                    <input type="text" className="form-control" id="inputIssueOrg" placeholder="Issuing Organization" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputIssueMonth">Issue Month</label>
                                    { selectMonth( "inputIssueMonth", this.changeIssueMonth ) }
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputIssueYear">Issue Year</label>
                                    <input type="number" className="form-control" id="inputIssueYear" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputExpirationMonth">Expiration Month</label>
                                    { selectMonth( "inputExpirationMonth", this.changeExpirationMonth ) }
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputExpirationYear">Expiration Year</label>
                                    <input type="number" className="form-control" id="inputExpirationYear" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label htmlFor="inputDescription">Description</label>
                                    <textarea type="text" className="form-control" id="inputDescription" placeholder="Description" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer closePopup={ this.closePopup } saveLicense={ this.saveLicense } />
                </div>
            </div>
        )
    }
}

export default AddLicense;
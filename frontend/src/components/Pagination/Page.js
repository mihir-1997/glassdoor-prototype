import React, { Component } from 'react'
import Pagination from '@material-ui/lab/Pagination'

import './Page.css'

export default class Page extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            currPage: 1
        }
    }

    handlePageChange = ( event, value ) => {
        this.setState( {
            currPage: value
        } )
        this.props.handlePageChange( value )
    }

    render () {
        return (
            <div className="row pages-wrapper">
                <div className="col-6 page-numbers">
                    <span>Page&nbsp;{ this.state.currPage }&nbsp;of&nbsp;{ Math.ceil( this.props.dataLength / this.props.eachPageSize ) }</span>
                </div>
                <div className="col-6 pages">
                    <Pagination count={ Math.ceil( this.props.dataLength / this.props.eachPageSize ) } variant="outlined" color="secondary" onChange={ this.handlePageChange } />
                </div>
            </div>
        )
    }
}

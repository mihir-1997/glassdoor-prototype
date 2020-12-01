import React, { Component } from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'

import './BubbleChart.css'

class Bubblechart extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            chartData: {}
        }
    }

    componentDidMount () {
        if ( this.props.data ) {
            let children = []
            try {
                var i = 0
                var BreakException = {};
                this.props.data.children.forEach( element => {
                    if ( i >= 5 ) throw BreakException
                    children.push( element )
                    i += 1
                } );
            } catch ( e ) {
                console.log( e )
            }
            this.setState( {
                chartData: { name: "root", children: children }
            } )
        }
    }

    render () {
        // Data Format
        // const root = {
        //     "name": "root",
        //     "children": [
        //         {
        //             "name": "node.1",
        //             "value": 5.0
        //         },
        //         {
        //             "name": "node.2",
        //             "value": 4.0
        //         },
        //         {
        //             "name": "node.3",
        //             "value": 2.0
        //         },
        //         {
        //             "name": "node.4",
        //             "value": 2.5
        //         },
        //         {
        //             "name": "node.5",
        //             "value": 1.0
        //         },
        //     ]
        // }
        return (
            <div className="chart-inline-60">
                <div className="text-center chart-heading">Top 5 Companies</div>
                <div className="bubble-chart-wrapper">
                    <ResponsiveBubble
                        root={ this.state.chartData }
                        margin={ { top: 10, right: 20, bottom: 10, left: 20 } }
                        padding={ 5 }
                        identity="name"
                        value="value"
                        colors={ [ "#81CA9C", "#5BB19A", "#419692", "#53B995", "#009590" ] }
                        colorBy="name"
                        leavesOnly={ true }
                        enableLabel={ true }
                        label={ function ( e ) { return e.id } }
                        labelSkipRadius={ 10 }
                        labelTextColor="#ffffff"
                    />
                </div>
            </div>
        )
    }
}

export default Bubblechart;
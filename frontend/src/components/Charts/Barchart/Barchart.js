import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'

class Barchart extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            chartData: [],
            dataKey: "Reviews"
        }
    }

    componentDidMount () {
        if ( this.props.dataKey ) {
            this.setState( {
                dataKey: this.props.dataKey
            } )
        }
        if ( this.props.data ) {
            this.setState( {
                chartData: this.props.data
            } )
        }
    }

    getLabel = ( value, angle, position, offset = 5 ) => {
        return { value: value, angle: angle, position: position, offset: offset }
    }

    render () {
        // Data Format
        // const data = [
        //     {
        //         "name": "Page A",
        //         "pv": 2400
        //     },
        //     {
        //         "name": "Page B",
        //         "pv": 1398
        //     },
        //     {
        //         "name": "Page C",
        //         "pv": 9800
        //     },
        //     {
        //         "name": "Page D",
        //         "pv": 3908
        //     },
        //     {
        //         "name": "Page E",
        //         "pv": 4800
        //     },
        //     {
        //         "name": "Page F",
        //         "pv": 3800
        //     },
        //     {
        //         "name": "Page G",
        //         "pv": 4300
        //     }
        // ]
        return (
            <div className="chart-inline">
                <ResponsiveContainer width="100%" height={ 250 }>
                    <BarChart width={ 730 } height={ 250 } barSize={ 35 } data={ this.state.chartData }>
                        <XAxis dataKey="name" padding={ { left: 5, right: 10 } } label={ this.getLabel( 'Company', 0, 'insideBottom', -3 ) } />
                        <YAxis padding={ { top: 10 } } label={ this.getLabel( 'No of Reviews', -90, 'center' ) } />
                        <Tooltip />
                        <Legend verticalAlign="top" height={ 30 } margin={ { top: 2, bottom: 10 } } />
                        <Bar dataKey={ this.state.dataKey } fill="#82ca9d" isAnimationActive={ true } animationBegin={ 0 } animationDuration={ 1700 } />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default Barchart;
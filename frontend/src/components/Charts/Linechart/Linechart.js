import React, { Component } from 'react'
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line, Legend } from 'recharts'

class Linechart extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            chartData: [],
            dataKey: "Reviews/Day"
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
        //         "uv": 4000,
        //     },
        //     {
        //         "name": "Page B",
        //         "uv": 3000,
        //     },
        //     {
        //         "name": "Page C",
        //         "uv": 2000,
        //     },
        //     {
        //         "name": "Page D",
        //         "uv": 2780,
        //     },
        //     {
        //         "name": "Page E",
        //         "uv": 1890,
        //     },
        //     {
        //         "name": "Page F",
        //         "uv": 2390,
        //     },
        //     {
        //         "name": "Page G",
        //         "uv": 3490,
        //     }
        // ]
        return (
            <div className="chart-inline">
                <ResponsiveContainer width="100%" height={ 250 }>
                    <LineChart width={ 450 } height={ 220 } data={ this.state.chartData } margin={ { top: 5, right: 30, left: 20, bottom: 5 } }>
                        <XAxis dataKey="name" padding={ { left: 5, right: 10 } } label={ this.getLabel( 'Date', 0, 'insideBottom', -5 ) } />
                        <YAxis padding={ { top: 10, bottom: 5 } } label={ this.getLabel( 'No of Reviews', -90, 'center' ) } />
                        <Tooltip />
                        <Legend verticalAlign="top" height={ 20 } />
                        <Line type="linear" dataKey={ this.state.dataKey } stroke="#82ca9d" isAnimationActive={ true } animationBegin={ 0 } animationDuration={ 1700 } strokeWidth="3" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default Linechart;
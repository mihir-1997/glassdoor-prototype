import React, { Component } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

import '../Charts.css'

class DonutChart extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            chartData: [],
            colors: []
        }
    }

    componentDidMount () {
        if ( this.props.data ) {
            this.setState( {
                chartData: this.props.data
            } )
        }
        if ( this.props.colors ) {
            this.setState( {
                colors: this.props.colors
            } )
        } else {
            const colors = [
                "#94DA66",
                "#194383",
                "#0CA941"
            ]
            this.setState( {
                colors: colors
            } )
        }
    }

    render () {
        // const data01 = [
        //     {
        //         "name": "Positive",
        //         "value": 61
        //     },
        //     {
        //         "name": "Neutral",
        //         "value": 23
        //     },
        //     {
        //         "name": "Negative",
        //         "value": 16
        //     },
        // ];
        // const colors = [
        //     "#94DA66",
        //     "#194383",
        //     "#0CA941"
        // ]
        let rectangle = ( color ) => {
            let style = {
                fill: color
            }
            return <svg width="15" height="15">
                <rect x="0" y="0" width="15" height="15" style={ style } />
            </svg>
        }
        return (
            <div>
                <ResponsiveContainer width={ 150 } height={ 150 }>
                    <PieChart>
                        <Pie data={ this.state.chartData } dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={ 30 } outerRadius={ 50 } startAngle={ 90 } endAngle={ -270 } >
                            {
                                this.state.chartData.map( ( entry, index ) => (
                                    <Cell key={ `cell-${ index }` } fill={ this.state.colors[ index ] } />
                                ) )
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="chart-inline">
                    {
                        this.state.chartData.map( ( data, index ) => {
                            return <span>
                                { rectangle( this.state.colors[ index ] ) }&nbsp;&nbsp;<span className="small-font">{ data.name }&nbsp;<strong>{ data.value }%</strong></span>
                                <br />
                            </span>
                        } )
                    }
                </div>

            </div>
        )
    }
}

export default DonutChart;
import React, { Component } from 'react'
import ReactWordcloud from 'react-wordcloud'

class WordCloud extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            chartData: []
        }
    }

    componentDidMount () {
        if ( this.props.data ) {
            this.setState( {
                chartData: this.props.data
            } )
        }
    }

    render () {
        // Data Format
        // const words = [
        //     {
        //         text: 'sundar pichai',
        //         value: 90,
        //     },
        //     {
        //         text: 'jeff bezos',
        //         value: 80,
        //     },
        // ]
        const options = {
            rotations: 0,
            rotationAngles: [ 0 ],
            fontFamily: 'Lato',
            fontSizes: [ 15, 40 ],
            enableTooltip: true,
            colors: [ "#81CA9C", "#5BB19A", "#419692", "#53B995", "#00A792", "#009590" ]
        };
        return (
            <div className="chart-inline-40">
                <div className="text-center chart-heading">Top 10 CEOs</div>
                <ReactWordcloud words={ this.state.chartData } options={ options } />
            </div>
        )
    }
}

export default WordCloud;
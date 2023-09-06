import React from "react";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import prices from '../components/data/data.json'
import "react-vis/dist/style.css";

export const LineGraph = () => {
    console.log(prices)

    const dataArr =  prices.map((item) => { 
        return {x: item.x, 
            y: item.y}
    });
        return (

            <XYPlot
                width={0.3*window.outerWidth}
                height={0.45*window.outerHeight}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    data={dataArr}/>
            </XYPlot>
        );
}


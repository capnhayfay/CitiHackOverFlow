import React from "react";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

export const LineGraph = (props) => {
    const dataArr = props.data.map((d)=> {
        return {x: d.prices, 
        y: parseFloat(d.count/1000)}
    });
        return (

            <XYPlot
                width={300}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    data={dataArr}/>
            </XYPlot>
        );
}


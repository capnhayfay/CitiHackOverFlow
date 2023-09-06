import React from "react";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, RadialChart} from 'react-vis';
import prices from '../components/data/data.json'
import "react-vis/dist/style.css";

export const PieChart = () => {
    const dataArr =  prices.map((item) => { 
        return item.x
    });
        
    return (

        // <XYPlot
        //     width={300}
        //     height={300}>
            // <VerticalGridLines />
            // <HorizontalGridLines />
            // <XAxis />
            // <YAxis />
            <RadialChart
                width={0.3*window.outerWidth}
                height={0.45*window.outerHeight}
                data={dataArr}/>
        // </XYPlot>
    );
}
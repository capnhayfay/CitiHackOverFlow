import React from "react";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Treemap} from 'react-vis';
import prices from './data/data.json'
import {myData} from "./data/treemapdata"
import "react-vis/dist/style.css";

export const Treemaps = () => {
    console.log(prices)

        return (
            <Treemap
            title={'My New Treemap'}

            // color={'#4ef542'}
            width={0.7*window.outerWidth}
            height={0.9*window.outerHeight}
            data={myData}
            // onLeafMouseOver={}
            />
        );
}


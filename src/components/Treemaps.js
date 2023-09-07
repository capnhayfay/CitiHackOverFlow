import React from "react";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Treemap} from 'react-vis';
import prices from './data/data.json'
import {myData} from "./data/treemapdata"
import "react-vis/dist/style.css";

const data = {
    title: "root",
    children: [
        { title: "Node 1", size: 5, color: "#ff5733" },
        { title: "Node 2", size: 8, color: "#ffa500" },
        { title: "Node 3", size: 12, color: "#ffcd33" },
        { title: "Node 4", size: 6, color: "#ffebcd" },
    ],
  };
  
const colorRange = ["#ff5733", "#ffa500", "#ffcd33", "#ffebcd"]; // Define custom colors

  
export const Treemaps = () => {
    console.log(prices)

        return (
            <Treemap
            title={'My New Treemap'}

            colorType="literal" // Use literal color assignment
            colorDomain={["#ff5733", "#ffa500", "#ffcd33", "#ffebcd"]}
            width={0.7*window.outerWidth}
            height={0.85*window.outerHeight}
            data={data}
            // onLeafMouseOver={}
            />
        );
}


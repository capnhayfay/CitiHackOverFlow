import React, { useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Hint,
} from 'react-vis';
import prices from '../components/data/data.json'
import prices2 from '../components/data/data2.json'
import "react-vis/dist/style.css";

export const LineGraph = () => {
    const [hoveredValue1, setHoveredValue1] = useState(null);
    const [hoveredValue2, setHoveredValue2] = useState(null);
  
    const dataArr = prices.map((item) => {
      return { x: item.x, y: item.y };
    });

    const dataArr2 = prices2.map((item) => {
        return { x: item.x, y: item.y };
      });
      
    // Define separate onNearestX handlers for each LineSeries
    const handleNearestX1 = (value, index) => {
      setHoveredValue1({ x: value.x, y: value.y });
    };

    const handleNearestX2 = (value, index) => {
      setHoveredValue2({ x: value.x, y: value.y });
    };
  
    return (
      <div>
        <XYPlot
          width={0.3 * window.outerWidth}
          height={0.45 * window.outerHeight}
          onMouseLeave={() => {
            setHoveredValue1(null);
            setHoveredValue2(null);
          }} // Clear both hoveredValue states on mouse leave
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            data={dataArr}
            onNearestX={handleNearestX1} // Use onNearestX to set hoveredValue1
          />
          <LineSeries
            data={dataArr2}
            onNearestX={handleNearestX2} // Use onNearestX to set hoveredValue2
          />
          {/* Add the Hint components to display values on mouseover */}
          {hoveredValue1 && (
            <Hint value={hoveredValue1}>
              <div>
                <strong>Line 1 X:</strong> {hoveredValue1.x}
                <br />
                <strong>Line 1 Y:</strong> {hoveredValue1.y}
              </div>
            </Hint>
          )}
          {hoveredValue2 && (
            <Hint value={hoveredValue2}>
              <div>
                <strong>Line 2 X:</strong> {hoveredValue2.x}
                <br />
                <strong>Line 2 Y:</strong> {hoveredValue2.y}
              </div>
            </Hint>
          )}
        </XYPlot>
      </div>
    );
};

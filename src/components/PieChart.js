import React, { useState } from "react";
import { RadialChart } from "react-vis";
import prices from "../components/data/data.json";
import "react-vis/dist/style.css";

export const PieChart = () => {
  const dataArr = prices.map((item) => {
    return { angle: item.y, label: item.x };
  });

  const [hoveredValue, setHoveredValue] = useState(null);

  const handleMouseOver = (datapoint) => {
    setHoveredValue(datapoint);
  };

  const handleMouseOut = () => {
    setHoveredValue(null);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "20px" }}>
        <RadialChart
          width={0.2 * window.outerWidth}
          height={0.45 * window.outerHeight}
          data={dataArr}
          onValueMouseOver={handleMouseOver}
          onValueMouseOut={handleMouseOut}
          innerRadius={0}
          radius={100}
        //   showLabels
        />
      </div>
      {hoveredValue && (
        <div style={{ textAlign: "left", border: "1px solid #ccc", padding: "10px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
            <p style={{ fontWeight: "bold" }}>Label: {hoveredValue.label}</p>
            <p style={{ fontSize: "14px" }}>Value: {hoveredValue.angle}</p>
        </div>
      )}
    </div>
  );
};

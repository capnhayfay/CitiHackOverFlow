import React, { useState } from "react";
import { Treemap } from "react-vis";
import prices from "./data/data.json";
import { myData } from "./data/treemapdata";
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

export const Treemaps = () => {
//   const [hoveredValue, setHoveredValue] = useState(null);

//   const handleLeafMouseOver = (node) => {
//     setHoveredValue(node);
//   };

//   const handleLeafMouseOut = () => {
//     setHoveredValue(null);
//   };

  return (
    <div style={{ position: "relative" }}>
      <Treemap
        title={"My New Treemap"}
        colorType="literal" // Use literal color assignment
        colorDomain={["#ff5733", "#ffa500", "#ffcd33", "#ffebcd"]}
        width={0.6 * window.outerWidth}
        height={0.85 * window.outerHeight}
        data={data}
        // onLeafMouseOver={handleLeafMouseOver}
        // onLeafMouseOut={handleLeafMouseOut}
      />
      {/* {hoveredValue && (
        <div
          style={{
            position: "absolute",
            top: hoveredValue.y0,
            left: hoveredValue.x0 + (hoveredValue.x1 - hoveredValue.x0) / 2,
            transform: "translate(-50%, -100%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "5px",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p>Title: {hoveredValue.title}</p>
          <p>Size: {hoveredValue.size}</p>
        </div>
      )} */}
    </div>
  );
};

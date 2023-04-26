import React from "react";
import Plot from "react-plotly.js";

interface BoxPlotProps {
  data: number[];
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data }) => {
  const plotData = [
    {
      y: data,
      type: "box",
      marker: {
        color: "rgb(255, 0, 0)",
        size: 3,
        line: {
          color: "black",
          width: 0.5
        }
      },
      line: {
        color: "black",
        width: 1
      }
    }
  ];

  return <Plot data={plotData} />;
};

export default BoxPlot;

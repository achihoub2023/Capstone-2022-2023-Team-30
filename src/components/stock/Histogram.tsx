import React from "react";
import Plot from "react-plotly.js";

interface IData {
  values: number[] ;
}

interface IProps {
  data: IData | undefined | null;
}

const Histogram: React.FC<IProps> = ({ data }) => {
    if (!data || !data.values) {
        return <div>Loading. Please wait!</div>;
      }    
  const plotData: Plotly.Data[] = [
    {
      x: data.values,
      type: "histogram",
      marker: { color: "blue" },
    },
  ];

  const layout = {
    title: "Histogram",
    xaxis: { title: "Values" },
    yaxis: { title: "Frequency" },
    bargap: 0.3
  };

  return <Plot data={plotData} layout={layout} />;
};

export default Histogram;

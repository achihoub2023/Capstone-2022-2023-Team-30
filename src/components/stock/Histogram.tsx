import React from "react";
import Plot from "react-plotly.js";

interface IData {
  values: string[] ;
}

interface IProps {
  data: IData | undefined | null;
  name_of_graph: string|null;
}

const Histogram: React.FC<IProps> = ({ data, name_of_graph}: any) => {
    if (!data || !data.values) {
        return <div>Loading. Please wait!</div>;
      }    
      type CountData = {
        [key: string]: number;
      };
      
      const countData: CountData = data.values.reduce((acc: CountData, val: string) => {
        if (!acc[val]) {
          acc[val] = 0;
        }
        acc[val]++;
        return acc;
      }, {});
      
      type Colors = {
        [key: string]: string;
      };
      
      const colors: Colors = {
        Positive: "green",
        Negative: "blue",
        Neutral: "gray",
      };
      
  const plotData: Plotly.Data[] = [
    {
      x: data.values,
      type: "histogram",
      marker: { 
        color: Object.keys(countData).map((key) => colors[key]),
      },
    },
  ];

  const layout = {
    title: "Histogram for " + name_of_graph,
    xaxis: { 
      title: "Values",
     },
    yaxis: { title: "Frequency" },
    bargap: 0.3
  };


  

  return <Plot data={plotData} layout={layout} />;
};

export default Histogram;

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getData } from './api';
import {postData} from './api'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// const res = axios({
//   method: "GET",
//   url:"http://172.31.217.82:8081/time_series_default",
// }).then((response) => {
//   const res = response.data
//   console.log(res)
//   console.log(res.x)
//   return res.x, res.y
// }).catch((error) => {
//   if (error.response) {
//     console.log(error.response)
//     console.log(error.response.status)
//     console.log(error.response.headers)
//     }
// }

// )

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  stockTicker: string; // The name of the stock
  nameOfStock: string;
};

export default function Forecast({stockTicker,nameOfStock}: Props) {

  const [resp, setData] = useState({});
  const url = "http://localhost:8081/time_series_default"
  // console.log({props.stockName});
  useEffect(() => {
    postData(stockTicker,nameOfStock,url).then(resp => setData(resp));
  }, []);

  const processed = JSON.parse(JSON.stringify(resp));
  const x_axis = processed.x?.split(",");
  const y_axis = processed.y?.split(",").map(Number);

  const data = {
    labels: x_axis,
    datasets: [
      {
        label:'Current Price',
        data: y_axis,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Forecast',
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: 'Stock Price',
        },
      },

      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
    }
  };

  return (
    <div className="Forcast wide-container">
      <h1>Forecast for: {nameOfStock}</h1>
      <Line options={options} data={data} />

    </div>
  );
}
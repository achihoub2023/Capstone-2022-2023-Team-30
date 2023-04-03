import React, { useState, useEffect } from 'react';
import 'components/styles/Forecast.css'
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
    // postData(stockTicker,nameOfStock,url).then(resp => setData(resp));
  }, []);

  const processed = JSON.parse(JSON.stringify(resp));
  console.log(processed)
  const x_axis = processed.x?.split(",");
  const y_axis = processed.y?.split(",").map(Number);

  const x_p = processed.x_pred?.split(",");
  const y_p = processed.y_pred?.split(",").map(Number);

  const [dropdownButtonText, setDropdownButtonText] = useState("Dropdown ▼");
  const [showDropdown, setShowDropdown] = useState("");

  const clickedDropdownBtn = (): void => {
    if(showDropdown === "") {
      setShowDropdown("show");
    } else {
      setShowDropdown("");
    }
  }

  const optionClicked = (option: string): void => {
    setDropdownButtonText(option + " ▼");
    setShowDropdown("");
  }

  const submitButtonClicked = (): void => {
    // Call backend API function here
  }

  const data = {
    labels: x_p,
    datasets: [
      {
        label:'Current Price',
        data: y_axis,
        borderColor: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 0, 255,0.5)',
      },
      {
        label: 'Predicted Price',
        data: y_p,
        borderColor: 'rgb(255, 50, 132)',
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
      <div className="header">
        <h1>Forecast for: {nameOfStock}</h1>
        <Line options={options} data={data} />
      </div>
      <div className="dropdown">
        <button onClick={clickedDropdownBtn} className="dropbtn">{dropdownButtonText}</button>
        <div id="myDropdown" className={`dropdown-content ${showDropdown}`}>
          <a onClick={() => optionClicked("Option 1")} href="#">Option 1</a>
          <a onClick={() => optionClicked("Option 2")} href="#">Option 2</a>
          <a onClick={() => optionClicked("Option 3")} href="#">Option 3</a>
          <a onClick={() => optionClicked("Option 4")} href="#">Option 4</a>
        </div>
        <button className="submit-button" onClick={submitButtonClicked}>Submit</button>
      </div>
    </div>
  );
}
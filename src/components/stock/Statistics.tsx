import googleArticles from "data/stockData/googleArticles.json";
import {postData} from './api'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import * as Plotly from 'plotly.js';
import Histogram from "./Histogram";
import { Bar, Chart } from 'react-chartjs-2';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface article {
  link: string;
  title: string;
}


type Props = {
  stockTicker: string; // The name of the stock
  nameOfStock: string;
};

interface IData {
  values: number[];
}


export default function Statistics({stockTicker,nameOfStock}: Props) {
  const [resp, setData] = useState({});
  const url = "http://localhost:8081/searchResults";
  useEffect(() => {
    postData(stockTicker,nameOfStock,url).then(resp => setData(resp));
  }, []);



  const processed = JSON.parse(JSON.stringify(resp));
  console.log(processed)

  const x_axis: IData = {
    values: processed.vader_list?.split(",").map(Number),
  };
  console.log(x_axis.values);
  const finbert_list: IData = {
     values: processed.finbert_list?.split(",").map(Number),
  }
  // console.log(x_axis);
  // console.log(typeof x_axis);

  return (
    <div className="ArticleList wide-container">
      <h1>{nameOfStock} Statistics Page</h1>
      <br></br>
      <div>
        <h2> Notes on Statistics Page</h2>
        <p>  Using the Finbert and VADER model, we rate each of the ten articles pulled as positive, negative, or neutral. The histogram plot of each one is shown below.
          1 is positive, 0 is negative, 2 is neutral. </p>
      </div>
      <br></br>
    <div className = "Histogram for Vader">
      <Histogram data = {x_axis}/>
    </div>
    <div className = "Histogram for Finbert">
      <Histogram data = {finbert_list}/>
    </div>
    </div>
  );
}
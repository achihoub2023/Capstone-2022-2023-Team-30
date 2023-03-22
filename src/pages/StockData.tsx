import React from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { useState } from "react";
import Chart from "components/stock/Chart";
import Forecast from "components/stock/Forecast";
import ArticleList from "components/stock/ArticleList";
import "pages/styles/StockDataPage.css";

type Props = {
  stockTicker: string; // Stock ticker
  nameOfStock: string; // Stock name
};

enum PageToShow {
  Chart,
  Forecast,
  Articles, // Add more chart types here
}

// This page shows the chart initially and then either the Forecast or profile depending on which button is clicked
export default function StockData({stockTicker,nameOfStock}: Props) {
  const [page, changePage] = useState(PageToShow.Chart);

  return (
    <>
      <div className="StockDataPage wide-container">
        <h1 className="stockTitle">{stockTicker}</h1>
        {/* <Outlet /> Articles, Forecast, Chart */}

        <Link to={"/pages/articles"}>
          <button className="large-rounded-btn dark-primary-bg white-text">
            Articles
          </button>
        </Link>

        <Link to={"/pages/forecast"}>
          <button className="large-rounded-btn dark-secondary-bg white-text">
            Forecast
          </button>
        </Link>
      </div>
    </>
  );
}
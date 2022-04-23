import React from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { useState } from "react";
import Chart from "components/stock/Chart";
import Forecast from "components/stock/Forecast";
import ArticleList from "components/stock/ArticleList";

type Props = {
  stockName: string; // The name of the stock
};

enum PageToShow {
  Chart,
  Forecast,
  Articles, // Add more chart types heres
}

// This page shows the chart initially and then either the Forecast or profile depending on which button is clicked
export default function StockData({ stockName }: Props) {
  const [page, changePage] = useState(PageToShow.Chart);

  return (
    <>
      <h1 className="stockTitle">{stockName}</h1>
      {/* <Outlet /> Articles, Forecast, Chart */}

      <Link to={"/pages/articles"}>
        <button className="articles-button">Articles</button>
      </Link>

      <Link to={"/pages/forecast"}>
        <button className="forecast-button">Forecast</button>
      </Link>
    </>
  );
}

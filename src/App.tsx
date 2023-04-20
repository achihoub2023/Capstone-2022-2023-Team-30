import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import Layout from "components/general/Layout";
import "App.css";
import Tutorial from "pages/Tutorial";
import SearchPage from "pages/SearchPage";
import { FStringSetter } from "interfaces";
import StockData from "pages/StockData";
import Forecast from "components/stock/Forecast";
import Chart from "components/stock/Chart";
import ArticleList from "components/stock/ArticleList";
import Statistics from "components/stock/Statistics";

export default function App() {
  const [stockTicker, setStockTicker] = useState("");
  const [nameOfStock, setNameOfStock] = useState("");

  const stockTickerSetter: FStringSetter = (stockName: string) => {
    setStockTicker(stockName);
  };

  const nameOfStockSetter: FStringSetter = (nameOfStock: string) => {
    setNameOfStock(nameOfStock);
  }

  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path="pages" element={<Layout/>}>
          <Route path="tutorial" element={<Tutorial/>}/>
          <Route
            path="search"
            element={<SearchPage stockTickerSetter={stockTickerSetter} nameOfStockSetter={nameOfStockSetter}/>}
          />
          <Route path="stock" element={<StockData stockTicker={stockTicker} nameOfStock={nameOfStock}/>}/>
          <Route path="forecast" element={<Forecast stockTicker={stockTicker} nameOfStock={nameOfStock}/>}/>
          <Route path="articles" element={<ArticleList stockTicker={stockTicker} nameOfStock={nameOfStock}/>}/>
          <Route path="statistics" element={<Statistics stockTicker={stockTicker} nameOfStock={nameOfStock}/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
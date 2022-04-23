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

export default function App() {
  const [stock, setStock] = useState("");

  const setStockName: FStringSetter = (stockName: string) => {
    setStock(stockName);
  };

  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="pages" element={<Layout />}>
          <Route path="tutorial" element={<Tutorial />} />
          <Route
            path="search"
            element={<SearchPage setStockName={setStockName} />}
          />
          <Route path="stock" element={<StockData stockName={stock} />} />
          <Route path="forecast" element={<Forecast stockName={stock} />} />
          <Route path="articles" element={<ArticleList stockName={stock} />} />
        </Route>
      </Routes>
    </Router>
  );
}

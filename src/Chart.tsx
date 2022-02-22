import React from 'react';
// import logo from './logo.svg';
import './App.css';
import StockList from './ChartComponents/StockList';
import SearchBar from './ChartComponents/SearchBar';

function Chart() {
  return (
    <div className="Chart">
      
        <h1>Chart</h1>

        <SearchBar />

        <StockList />

        


    </div>
  );
}

export default Chart;

import React, { useEffect } from "react";
import "App.css";
import "pages/styles/SearchPage.css";
import StockList from "components/search/StockList";
import SearchBar from "components/search/SearchBar";
import { FStringSetter, IHeaderContext } from "interfaces";
import { useOutletContext } from "react-router-dom";

type Props = {
  stockTickerSetter: FStringSetter; // Set stock name state in App.tsx to stock name picked in this component
  nameOfStockSetter: FStringSetter
};

function SearchPage({stockTickerSetter, nameOfStockSetter}: Props) {
  const {setHeadingName} = useOutletContext() as IHeaderContext;
  useEffect(() => {
    setHeadingName("Search"); // throws some sort of error, still gotta figure that out
  }, []);

  return (
    <div className="SearchPage container">
      <SearchBar stockTickerSetter={stockTickerSetter} nameOfStockSetter={nameOfStockSetter}/>
      <StockList stockTickerSetter={stockTickerSetter} nameOfStockSetter={nameOfStockSetter}/>
    </div>
  );
}

export default SearchPage;
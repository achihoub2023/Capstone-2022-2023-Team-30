import React from "react";
import "App.css";
import StockList from "components/search/StockList";
import SearchBar from "components/search/SearchBar";
import { FStringSetter, IHeaderContext } from "interfaces";
import { useOutletContext } from "react-router-dom";

type Props = {
  setStockName: FStringSetter; // Set stock name state in App.tsx to stock name picked in this component
};

function SearchPage({ setStockName }: Props) {
  const { setHeadingName } = useOutletContext() as IHeaderContext;
  setHeadingName("Search");
  return (
    <div className="SearchPage">
      <h1>Search For a Stock!</h1>
      <SearchBar />
      <StockList onStockClick={setStockName} />
    </div>
  );
}

export default SearchPage;

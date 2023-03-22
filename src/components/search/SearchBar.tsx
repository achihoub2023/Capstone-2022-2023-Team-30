import { FStringSetter } from "interfaces";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  stockTickerSetter: FStringSetter; // Set stock name state in App.tsx to stock name picked in this component
  nameOfStockSetter: FStringSetter;
};

function SearchBar({stockTickerSetter, nameOfStockSetter}: Props) {
  // const [inputValue, setInputValue] = useState("");
  let link = "/pages/stock:";

  return (
    <div className="SearchBar">
      <input 
        type="text" 
        placeholder="Type a stock ticker..."  
        onChange={(e) => {
          stockTickerSetter(e.target.value);
          // Set nameOfStock here
          console.log(e.target);
          nameOfStockSetter(e.target.value);
          link = "/pages/stock:" + e.target.value;
          console.log(link);
        }} 
      />
      <button onClick={() => console.log(link)}>
        <Link to={link}>
          <img 
            src="/SearchIcon.svg" 
            alt="search"   
          />
        </Link>
      </button>
    </div>
  );
}

export default SearchBar;
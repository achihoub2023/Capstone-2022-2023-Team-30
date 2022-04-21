import { FStringSetter } from "interfaces";
import React, { useEffect } from "react";

interface Props {
  onStockClick: FStringSetter;
}

export default function StockList(props: Props) {
  const whenStockNameClicked = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    console.log(e.currentTarget.innerText);
    props.onStockClick(e.currentTarget.innerText);
  };

  //Function to add elements to the list
  const addStocks = (stockNames: string[]): void => {
    for (const stock in stockNames) {
      const stockList = document.getElementById("list")!;
      const li = document.createElement("li");
      li.innerText = stockNames[stock];
      li.addEventListener("click", (e: any) => whenStockNameClicked(e));
      stockList.appendChild(li);
    }
  };

  //Ran on component launch
  const componentDidMount = (): void => {
    addStocks(["Apple", "Google", "Microsoft", "Amazon"]);
  };

  return (
    <div className="StockList">
      {/* Placeholder for design */}
      <ul id="list"></ul>
    </div>
  );
}

import { FStringSetter } from "interfaces";
import React, { useEffect } from "react";
import stocks from "data/DefaultStocks";
import { Link } from "react-router-dom";

interface Props {
  setStockName: FStringSetter;
}

export default function StockList({setStockName}: Props) {
  return (
    <div className="StockList">
      {stocks.map((stock, index) => (
        <Link to={"/pages/stock:" + stock.ticker} onClick={() => setStockName(stock.ticker)}>
        <div className="stock" key={index}>
          <img src={stock.icon} alt="stock icon" />
          <div className="stock-text">
            <div className="top">
              <h3 className="stock-name" title="An interesting stock...">
                {stock.name}
              </h3>
              <p className="stock-price">{stock.price}</p>
            </div>
            <p className="stock-desc">{stock.description}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
  // const whenStockNameClicked = (
  //   e: React.MouseEvent<HTMLLIElement, MouseEvent>
  // ): void => {
  //   console.log(e.currentTarget.innerText);
  //   props.onStockClick(e.currentTarget.innerText);
  // };

  // //Function to add elements to the list
  // const addStocks = (stockNames: string[]): void => {
  //   for (const stock in stockNames) {
  //     const stockList = document.getElementById("list")!;
  //     const li = document.createElement("li");
  //     li.innerText = stockNames[stock];
  //     li.addEventListener("click", (e: any) => whenStockNameClicked(e));
  //     stockList.appendChild(li);
  //   }
  // };

  // //Ran on component launch
  // const componentDidMount = (): void => {
  //   addStocks(["Apple", "Google", "Microsoft", "Amazon"]);
  // };
}

import React, { Component } from 'react'

interface Props {
  onStockClick: (stockName: string) => void
}

class StockList extends Component<Props> {
  render(){
    return (
      <div className="StockList">

        {/* Placeholder for design */}
        <ul id="list"></ul>

      </div>
    )
  }

  whenStockNameClicked(e: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
    console.log(e.currentTarget.innerText)
    this.props.onStockClick(e.currentTarget.innerText)
  }

  // //Function to add elements to the list
  addStocks(stockNames: string[]): void {
    for (const stock in stockNames) {
      const stockList = document.getElementById("list")!
      const li = document.createElement("li")
      li.innerText = stockNames[stock]
      li.addEventListener("click", (e: any) => this.whenStockNameClicked(e))
      console.log(li)
      stockList.appendChild(li)
    }
  }

  //Ran on component launch
  componentDidMount(): void {
    this.addStocks(["Apple", "Google", "Microsoft", "Amazon"])
    console.log("StockList mounted")
  }
}

export default StockList
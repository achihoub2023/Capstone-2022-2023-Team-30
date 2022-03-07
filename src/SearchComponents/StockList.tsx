import React from 'react';
// import './App.css';

interface Props {
    onStockClick: (stockName: string) => void;
}


//Function that takes value in HTML element and calls onStockClick function



function StockList({ onStockClick }: Props) {
  
  function hello(): void {
    
      console.log("hrllo");

      const item = document.querySelector('#list')

      // console.log(item?.getElement);




  }

  return (
    <div className="StockList">

        {/* Placeholder for design */}
        <ul id='list' onClick={hello}>
            <li id='apple'>Apple</li>
            <li >Microsoft</li>
            <li >Google</li>
        </ul>


    </div>
  );
}

export default StockList;

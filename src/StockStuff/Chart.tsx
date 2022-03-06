import React from 'react';
// import logo from './logo.svg';
// import './App.css';

type Props = {

    stockName: string; // The name of the stock
    onBackClick: () => void; // Back button

}


function Chart({ stockName, onBackClick}: Props) {
  return (
    <div className="Chart">
      
        <h1>Chart for {stockName}</h1>

        {/* Go back to search */}
        <button onClick={onBackClick}>Back</button>

        


    </div>
  );
}

export default Chart;

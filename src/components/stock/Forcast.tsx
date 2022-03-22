import React from 'react';
// import logo from './logo.svg';
// import './App.css';


type Props = {
    
    stockName: string; // The name of the stock
    onBackClick: () => void; // Back button

};


function Forcast({ stockName, onBackClick}: Props) {
  return (
    <div className="Forcast">

        {/* Placeholder */}

        <h1>{stockName}'s Forcast</h1>


    </div>
  );
}

export default Forcast;

import React from 'react';

type Props = {
  stockName: string; // The name of the stock
  onBackClick: () => void; // Back button
};

function Forcast({ stockName, onBackClick}: Props) {
  return (
    <div className="Forcast">
        <h1>{stockName}'s Forcast</h1>
    </div>
  );
}

export default Forcast;
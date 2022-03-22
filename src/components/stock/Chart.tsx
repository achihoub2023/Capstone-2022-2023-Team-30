import React from 'react';

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
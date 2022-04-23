import React from "react";

type Props = {
  stockName: string; // The name of the stock
};

function Chart({ stockName }: Props) {
  return (
    <div className="Chart wide-container">
      <h1>Chart</h1>
    </div>
  );
}

export default Chart;

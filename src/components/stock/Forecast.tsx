import React from "react";

type Props = {
  stockName: string; // The name of the stock
};

export default function Forecast({ stockName }: Props) {
  return (
    <div className="Forcast wide-container">
      <h1>Forecast</h1>
    </div>
  );
}

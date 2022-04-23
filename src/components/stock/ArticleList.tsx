import React from "react";
import { useFetch } from "react-async";
import articles from "data/stockData/googleArticles.json";

type Props = {
  stockName: string; // The name of the stock
};

export default function ArticleList({ stockName }: Props) {
  console.log(articles);

  return (
    <div className="ArticleList wide-container">
      <h1>Article List</h1>
    </div>
  );
}

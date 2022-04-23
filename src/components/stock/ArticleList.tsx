import React from "react";
import googleArticles from "data/stockData/googleArticles.json";

type Props = {
  stockName: string; // The name of the stock
};

export default function ArticleList({ stockName }: Props) {

  //function for when article is clicked, open article in new tab
  const whenStockNameClicked = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ): void => {
    const article: string | null | undefined =
      e.currentTarget.querySelector(".article-link")?.textContent;
    if (article) {
      console.log(article);
      window.open(article, "_blank");
    } else {
      console.error(
        "something went wrong in capturing the stock you clicked, please try again"
      );
    }
  };


  return (
    <div className="ArticleList wide-container">
      <h1>Article List</h1>

      {
        googleArticles.articles.map((article, index) => (
          <div className="article" key={index} onClick={whenStockNameClicked} >
            <h3>{article.title}</h3>
            <p className="article-link">{article.link}</p>
          </div>
        ))
      }


    </div>
  );
}

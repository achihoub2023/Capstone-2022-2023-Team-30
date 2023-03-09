import googleArticles from "data/stockData/googleArticles.json";
import {postData} from './api'
import React, { useState, useEffect } from 'react';

interface article {
  link: string;
  title: string;
}

type Props = {
  stockTicker: string; // The name of the stock
  nameOfStock: string;
};

export default function ArticleList({stockTicker}: Props) {
  const [resp, setData] = useState({});
  // console.log({props.stockName});
  const url = "http://localhost:8081/searchResults";
  useEffect(() => {
    postData(stockTicker,url).then(resp => setData(resp));
  }, []);

  console.log(resp);
  
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

  const processed = JSON.parse(JSON.stringify(resp));

  // console.log(processed.articles.value)
  // console.log(processed.articles);

  // console.log(googleArticles);

  // console.log(typeof processed.articles);

  // console.log("after");
  // console.log(googleArticles.articles);
  var lists = []
  for(var i =0; i<processed.articles?.length; i++){
    lists.push([processed.articles?.[i].link,processed.articles?.[i].title]);
  }

  // processed.articles?.map((article:Object,index:Number) => console.log(article.title));
  // console.log(processed.articles.map((article,index) => console.log(article.link));
  // const output = processed.userList.map(() => processed.link);

  // console.log(output);

  return (
    <div className="ArticleList wide-container">
      <h1>Article List</h1>
      {
        lists.map((article, index) => (
          <div className="article" key={index} onClick={whenStockNameClicked} >
            <h3>{article[0]}</h3>
            <p className="article-link">{article[1]}</p>
          </div>
        ))
      }
    </div>
  );
}
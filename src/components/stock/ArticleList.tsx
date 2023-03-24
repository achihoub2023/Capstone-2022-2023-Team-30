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

export default function ArticleList({stockTicker,nameOfStock}: Props) {
  const [resp, setData] = useState({});
  // console.log({props.stockName});
  const url = "http://localhost:8081/searchResults";
  useEffect(() => {
    postData(stockTicker,nameOfStock,url).then(resp => setData(resp));
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
    lists.push([processed.articles?.[i].link,processed.articles?.[i].title,
      processed.articles?.[i].finbert,processed.articles?.[i].vader]);
      console.log(processed.finbert?.[i])
  }

  // processed.articles?.map((article:Object,index:Number) => console.log(article.title));
  // console.log(processed.articles.map((article,index) => console.log(article.link));
  // const output = processed.userList.map(() => processed.link);
  console.log(lists)
  // console.log(output);

  return (
    <div className="ArticleList wide-container">

      <h1>Article List</h1>
      <br></br>
      <div>
        <h2> Notes on VADER and Finbert Scores</h2>
        <p>  VADER scores are reported from -1 to 1. Finbert scores is an integer 0,1, or 2. Finbert score of 0 is positive, 1 is negative, 2 is neutral.
          Sometimes, websites cannot be scraped due to the website's policy. </p>
      </div>
      <br></br>
      {
        lists.map((article, index) => (
          <div className="article" key={index} onClick={whenStockNameClicked} >
            <h3>{article[0]}</h3>
            <p className="article-link">{article[1]}</p>
            <p>Finbert Score: {article[2]}</p>
            <p>Vader Score: {article[3]}</p>
            <br></br>
          </div>
        ))
      }
    </div>
  );
}
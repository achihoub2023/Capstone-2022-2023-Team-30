import googleArticles from "data/stockData/googleArticles.json";
import {postData} from './api'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [htmlContent, setHtmlContent] = useState<JSX.Element[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const url = "http://localhost:8081/searchResults";
  const [articlesLoaded, setArticlesLoaded] = useState(false); // State variable to track if articles have loaded

  const handleDateChange = (date: Date) => {
    var date_string = date.toDateString();
    postData(stockTicker,nameOfStock,date_string,url).then(resp => setData(resp));
  };

  useEffect(() => {
    const processed = JSON.parse(JSON.stringify(resp));
    const lists = processed.articles?.map((article: any, index: any) => (
      <div className="article" key={index} onClick={whenStockNameClicked}>
        <h3>{article.link}</h3>
        <p className="article-link">{article.title}</p>
        <p>Finbert Score: {article.finbert}</p>
        <p>Vader Score: {article.vader}</p>
        <br></br>
      </div>
    ));
    setHtmlContent(lists || []);
    setArticlesLoaded(true)
  }, [resp]);

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

      <h1>{nameOfStock} Article List</h1>
      <br></br>
      <div>
        <h2> Notes on VADER and Finbert Scores</h2>
        <p>  VADER scores are reported from -1 to 1. Finbert scores is an integer 0,1, or 2. Finbert score of 0 is positive, 1 is negative, 2 is neutral.
          Sometimes, websites cannot be scraped due to the website's policy. </p>
      </div>
      <br></br>
      
    <div className="calendar">
    Pick a date here: <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
      />
    </div>

      <br></br>
      <h3>{selectedDate}</h3>
      <div className="article-container">
        {htmlContent}
      </div>
      <br></br>

    {articlesLoaded &&(
      <div className="stat-btn-container">
      <Link to="/pages/statistics">
          <button className="stat-button">Statistics</button>
        </Link>
      </div> 
    )  }
    </div>
  );
}


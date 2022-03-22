import React from 'react';
// import logo from './logo.svg';
// import './App.css';


type Props = {
    
    stockName: string; // The name of the stock
    onBackClick: () => void; // Back button

};


function ArticleList({ stockName, onBackClick}: Props) {
  return (
    <div className="ArticleList">

        {/* Placeholder */}

        <h1>{stockName}'s Article List</h1>


    </div>
  );
}

export default ArticleList;

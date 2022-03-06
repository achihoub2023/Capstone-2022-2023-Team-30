import React from 'react';
// import logo from './logo.svg';
import './App.css';
import StockList from './SearchComponents/StockList';
import SearchBar from './SearchComponents/SearchBar';

type Props = {

    setStockName: (name: string) => void; // Set stock name state in App.tsx to stock name picked in this component

}

function SearchPage({ setStockName }: Props) {

    //TODO: Implement function that calls setStockName when stock is selected


    return (
        <div className="SearchPage">

            <h1>Search For a Stock!</h1>

            <SearchBar />

            <StockList />




        </div>
    );
}

export default SearchPage;

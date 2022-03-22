import React from 'react';
import { useState } from 'react';
import Chart from 'components/stock/Chart';
import Forcast from 'components/stock/Forcast';
import ArticleList from 'components/stock/ArticleList';

type Props = {
    stockName: string; // The name of the stock
    onBackClick: () => void; // Back button
}

enum PageToShow {
    Chart, Forcast, Articles  // Add more chart types heres
}

// This page shows the chart initially and then either the forcast or profile depending on which button is clicked
function StockData({ stockName, onBackClick }: Props) {
    const [page, changePage] = useState(PageToShow.Chart);

    function backToChart(): void {
        changePage(PageToShow.Chart);
    }

    return (
        <div className="StockData">
            {(page === PageToShow.Chart) && <Chart stockName={stockName} onBackClick={onBackClick} />}
            {(page === PageToShow.Forcast) && <Forcast stockName={stockName} onBackClick={backToChart} />}
            {(page === PageToShow.Articles) && <ArticleList stockName={stockName} onBackClick={backToChart} />}
        </div>
    );
}

export default StockData;

import React from 'react'
// import './App.css';

interface Props {
    onStockClick: (stockName: string) => void
}

//Function that takes value in HTML element and calls onStockClick function
function StockList({ onStockClick }: Props) {
    function hello(e: any): void {
        console.log(e.currentTarget.innerText)
    }

    return (
        <div className="StockList">
            {/* Placeholder for design */}
            <ul id="list" onClick={(e) => hello(e)}>
                <li
                    onClick={(e) => {
                        hello(e)
                    }}
                >
                    Apple
                </li>
                <li
                    onClick={(e) => {
                        hello(e)
                    }}
                >
                    Microsoft
                </li>
                <li
                    onClick={(e) => {
                        hello(e)
                    }}
                >
                    Google
                </li>
            </ul>
        </div>
    )
}

export default StockList

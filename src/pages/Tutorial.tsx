import React from 'react';
import 'App.css';
import {
    Link
} from "react-router-dom";

// // Function for the button
// type Props = {
//     // wasContiueClicked: boolean;
//     onBackClick: () => void;
//     onNextclick: () => void;
// };

function Tutorial() {
    return (
        <div className="Tutorial">
            <h1>Tutorial</h1>
            <Link to="/">
                <button>Back</button>
            </Link>
            <p>
                Welcome to J.E.D.I ! 
                Our goal is to help you find info on events surrounding various stock trends, and forecast stock movement.
                We use online data from the live stock market to give you the most accurate info possible.
                We also link stock trends with news sources to help you understand why the stock could have moved the way it did.
                Our machine learning model takes this historical data linking past events to corresponding stock trends to make predictions about future motion of similar stocks.
                To Learn About Stock History
                Step 1: Type a stock name into the search bar and select your stock.
                Step 2: Use the sliders and buttons to select a time frame.
                Step 3: Click Search to get links to events correlated with that stock motion.
                To See Our Prediction Step
                1: Type a stock name into the search bar and select your stock.
                Step 2: Scroll down and click Predict.
                Step 3: Read our prediction, check our sources, and make your own decision!
                Disclaimer: This content is for informational purposes only, you should not construe any such information or other material as legal, tax, investment, financial, or other advice.
            </p>

            <Link to="/search">
                <button>Continue</button>
            </Link>
        </div>
    );
}

export default Tutorial;
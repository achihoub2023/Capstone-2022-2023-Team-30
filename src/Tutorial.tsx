import React from 'react';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
// import logo from './logo.svg';
// import './App.css';


// Function for the button


type Props = {
    // wasContiueClicked: boolean;
    onBackClick: () => void;
    onNextclick: () => void;

};

function Tutorial({ onBackClick, onNextclick}: Props) {
    return (
        <div className="Tutorial">

            <h1>Tutorial</h1>

            <button onClick={onBackClick}>Back</button>

            <p>
                Welcome to J.E.D.I ! 
                <br />
                <br />
                Our goal is to help you find info on events surrounding various stock trends, and forecast stock movement.
                <br />
                <br />
                We use online data from the live stock market to give you the most accurate info possible.
                <br />
                <br />
                We also link stock trends with news sources to help you understand why the stock could have moved the way it did.
                <br /> 
                <br />
                Our machine learning model takes this historical data linking past events to corresponding stock trends to make predictions about future motion of similar stocks.
                <br />
                <br />
                To Learn About Stock History
                <br />
                <br />
                Step 1: Type a stock name into the search bar and select your stock.
                <br />
                <br />
                Step 2: Use the sliders and buttons to select a time frame.
                <br />
                <br />
                Step 3: Click Search to get links to events correlated with that stock motion.
                <br />
                <br />
                To See Our Prediction Step
                <br />
                <br />
                1: Type a stock name into the search bar and select your stock.
                <br />
                <br />
                Step 2: Scroll down and click Predict.
                <br />
                <br />
                Step 3: Read our prediction, check our sources, and make your own decision!
                <br />
                <br />
                Disclaimer: This content is for informational purposes only, you should not construe any such information or other material as legal, tax, investment, financial, or other advice.
            </p>

            <button onClick={onNextclick}>Continue</button>


        </div>
    );
}

export default Tutorial;

import React from 'react';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
// import logo from './logo.svg';
// import './App.css';


// Function for the button


type Props = {
    // wasContiueClicked: boolean;
    onGetStartedClick: () => void;
    onTutorialClick: () => void;
};

function LandingPage({ onGetStartedClick, onTutorialClick}: Props) {
    return (
        <div className="LandingPage">

            <h1>J.E.D.I</h1>

            <button onClick={onTutorialClick}>Tutorial</button>
            <button onClick={onGetStartedClick}>Get Started</button>


        </div>
    );
}

export default LandingPage;

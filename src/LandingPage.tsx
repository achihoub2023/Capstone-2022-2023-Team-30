import React from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
// import logo from './logo.svg';
// import './App.css';


// Function for the button


type Props = {
    // wasContiueClicked: boolean;
    onClick: () => void;
};

function LandingPage({onClick}: Props) {
  return (
    <div className="LandingPage">
        
        <h1>This is the landing page, click the button to continue</h1>

        <button onClick={onClick}>Continue</button>

    </div>
  );
}

export default LandingPage;

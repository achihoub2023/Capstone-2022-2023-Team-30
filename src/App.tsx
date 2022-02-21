// import { syncBuiltinESMExports } from 'module';
import React from 'react';
import {useState} from 'react';
import './App.css';
import Chart from './Chart';
import LandingPage from './LandingPage';
import Tutorial from './Tutorial';








function App() {

    const [appOn, setAppOn] = useState(false);
    const [tutorialOn, setTutorialOn] = useState(false);

    function getStartedClick(this: any): void {
        console.log("Continue was clicked");
        setAppOn(true);
        setTutorialOn(false);
    }

    function tutorialClick(this: any): void {
        console.log("Tutorial was clicked");
        setTutorialOn(true);
    }

    function backtoMain(this: any): void {
        console.log("Back was clicked");
        setTutorialOn(false);
        setAppOn(false);
    }

    

    return (
        <div className="App">

            <h1>App</h1>

            {(!appOn && !tutorialOn) && <LandingPage

                onGetStartedClick={() => getStartedClick()}
                onTutorialClick={() => tutorialClick()}

            />} 

            {(appOn && !tutorialOn) && <Chart />}

            {(tutorialOn && !appOn) && <Tutorial
            
                onBackClick={() => backtoMain()}
                onNextclick={() => getStartedClick()}
            
            />}

        </div>

        






    );
}

export default App;

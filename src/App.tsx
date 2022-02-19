import { syncBuiltinESMExports } from 'module';
import React from 'react';
import {useState} from 'react';
import './App.css';
import Chart from './Chart';
import LandingPage from './LandingPage';








function App() {

    const [appOn, setAppOn] = useState(false);

    function onContinueClick(this: any): void {
        console.log("Continue was clicked");
        setAppOn(true);
    }


    return (
        <div className="App">

            <h1>App</h1>

            {!appOn && <LandingPage

                onClick={() => onContinueClick()}

            />} 

            {appOn && <Chart />}

        </div>

        






    );
}

export default App;

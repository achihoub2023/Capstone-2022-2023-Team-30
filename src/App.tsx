import React from 'react';
import {useState} from 'react';
import './App.css';
import Chart from './Chart';
import LandingPage from './LandingPage';








function App() {

    const [appOn, setAppOn] = useState(false);

    function Continue(this: any): void {
        console.log(appOn);
        console.log("Continue was clicked");
        // this.state.appOn = true;
        setAppOn(true);
        console.log(appOn);
    }


    return (
        <div className="App">

            <h1>App</h1>

            {!appOn && <LandingPage

                onContinueClicked={() => Continue()}

            />} 

            {appOn && <Chart />}

        </div>

        






    );
}

export default App;

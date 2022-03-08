// import { syncBuiltinESMExports } from 'module';
import React from 'react'
import { useState } from 'react'
import './App.css'
import SearchPage from './SearchPage'
import LandingPage from './LandingPage'
import Tutorial from './Tutorial'
import StockData from './StockData'

function App() {
    const [appOn, setAppOn] = useState(false)
    const [tutorialOn, setTutorialOn] = useState(false)
    const [stockName, setStockName] = useState<string | null>(null)

    function getStartedClick(this: any): void {
        console.log('Continue was clicked')
        setAppOn(true)
        setTutorialOn(false)
    }

    function tutorialClick(this: any): void {
        console.log('Tutorial was clicked')
        setTutorialOn(true)
    }

    function backtoMain(this: any): void {
        console.log('Back was clicked')
        setTutorialOn(false)
        setAppOn(false)
    }

    function setStock(name: string): void {
        console.log('Stock name was set')
        setStockName(name)
    }

    function backToSearch(this: any): void {
        console.log('Back was clicked')
        setStockName(null)
    }

    return (
        <div className="App">
            <h1>App</h1>

            {!appOn && !tutorialOn && (
                <LandingPage
                    onGetStartedClick={() => getStartedClick()}
                    onTutorialClick={() => tutorialClick()}
                />
            )}

            {tutorialOn && !appOn && (
                <Tutorial
                    onBackClick={() => backtoMain()}
                    onNextclick={() => getStartedClick()}
                />
            )}

            {appOn && !tutorialOn && stockName == null && (
                <SearchPage setStockName={(x) => setStock(x)} />
            )}

            {appOn && !tutorialOn && stockName != null && (
                <StockData
                    stockName={stockName}
                    onBackClick={() => backToSearch()}
                />
            )}
        </div>
    )
}

export default App

import React from 'react'
import { useState } from 'react'
import 'App.css'
import SearchPage from './pages/SearchPage'
import LandingPage from './pages/LandingPage'
import Tutorial from './pages/Tutorial'
import StockData from './pages/StockData'
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

function App() {
    const [appOn, setAppOn] = useState(false)
    const [tutorialOn, setTutorialOn] = useState(false)
    const [stockName, setStockName] = useState<string | null>(null)

    function setStock(name: string): void {
        console.log('Stock name was set')
        setStockName(name)
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/search" element={<SearchPage setStockName={setStock}/>} />
            </Routes>
        </Router>
    )

    /**
     * Legacy code below
     */

    // function getStartedClick(this: any): void {
    //     console.log('Continue was clicked')
    //     setAppOn(true)
    //     setTutorialOn(false)
    // }

    // function tutorialClick(this: any): void {
    //     console.log('Tutorial was clicked')
    //     setTutorialOn(true)
    // }

    // function backtoMain(this: any): void {
    //     console.log('Back was clicked')
    //     setTutorialOn(false)
    //     setAppOn(false)
    // }

    // function backToSearch(this: any): void {
    //     console.log('Back was clicked')
    //     setStockName(null)
    // }

    // return (
    //     <div className="App">
    //         <h1>App</h1>

    //         {!appOn && !tutorialOn && (
    //             <LandingPage
    //                 onGetStartedClick={() => getStartedClick()}
    //                 onTutorialClick={() => tutorialClick()}
    //             />
    //         )}

    //         {tutorialOn && !appOn && (
    //             <Tutorial
    //                 onBackClick={() => backtoMain()}
    //                 onNextclick={() => getStartedClick()}
    //             />
    //         )}

    //         {appOn && !tutorialOn && stockName == null && (
    //             <SearchPage setStockName={(x) => setStock(x)} />
    //         )}

    //         {appOn && !tutorialOn && stockName != null && (
    //             <StockData
    //                 stockName={stockName}
    //                 onBackClick={() => backToSearch()}
    //             />
    //         )}
    //     </div>
    // )
}

export default App

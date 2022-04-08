import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LandingPage from 'pages/LandingPage';
import 'App.css';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
            </Routes>
        </Router>
    );
}
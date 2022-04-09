import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LandingPage from 'pages/LandingPage';
import Layout from 'components/general/Layout';
import 'App.css';
import Tutorial from 'pages/Tutorial';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/pages/*' element={<Layout/>}> 
                    <Route path='tutorial' element={<Tutorial/>} />
                </Route>
            </Routes>
        </Router>
    );
}
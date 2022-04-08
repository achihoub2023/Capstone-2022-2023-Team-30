import React from 'react';
import { Link } from "react-router-dom";
import 'pages/styles/LandingPage.css';

// // Function for the button
// type Props = {
//     // wasContiueClicked: boolean;
//     onGetStartedClick: () => void;
//     onTutorialClick: () => void;
// };

function LandingPage() {
    return (
        <div className="container main-container">
            <h1 className='huge-text main-title dark-primary-text'>J.E.D.I</h1>
            <div className="large-text slogan">
                <p>Join</p>
                <p>Educate</p>
                <p>Discover</p>
                <p>Invest</p>
            </div>
            <Link to="/tutorial">
                <button className='large-rounded-btn dark-primary-bg white-text'>Tutorial</button>
            </Link>
            <Link to="/search">
                <button className='large-rounded-btn dark-secondary-bg white-text'>Get Started</button>
            </Link>
        </div>
    );
}

export default LandingPage;
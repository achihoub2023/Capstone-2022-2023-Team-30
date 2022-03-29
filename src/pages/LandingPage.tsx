import React from 'react';
import {
    Link
} from "react-router-dom";

// // Function for the button
// type Props = {
//     // wasContiueClicked: boolean;
//     onGetStartedClick: () => void;
//     onTutorialClick: () => void;
// };

function LandingPage() {
    return (
        <div className="LandingPage">
            <h1>J.E.D.I</h1>
            <p>
                Join
                Educate
                Discover
                Invest        
            </p>
            <Link to="/tutorial">
                <button>Tutorial</button>
            </Link>
            <Link to="/search">
                <button>Get Started</button>
            </Link>
        </div>
    );
}

export default LandingPage;
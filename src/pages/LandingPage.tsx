import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'pages/styles/LandingPage.css';

// // Function for the button
// type Props = {
//     // wasContiueClicked: boolean;
//     onGetStartedClick: () => void;
//     onTutorialClick: () => void;
// };

function LandingPage() {

    const [backendData, setBackendData] = useState({
        name: "",
        about: "",
    });

    function getData() {
        fetch("http://localhost:5000/profile", {method: "GET"})
            .then((response) => {
                const res = response.json();
                console.log(res);
                return res;
            })
            .then((data) => {
                console.log(data);
                setBackendData({
                    name: data.name,
                    about: data.about
                });
                console.log(backendData);
            })
    }

    function getData2() {
        fetch("http://localhost:5000/data", {
      body: JSON.stringify({ "name" : "testPOST" }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response.json());
        const res = response.json();
        console.log(res);
        // setProfileData(res);
        return res;
      })
      .then((data) => {
        console.log(data);
                setBackendData({
                    name: data.name,
                    about: data.about
                });
                console.log(backendData);
      });
    }

    function testing() {
        fetch("http://localhost:5000/data", {
      body: JSON.stringify({ "date" : "2022-01-25" }),
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response.json());
        const res = response.json();
        console.log(res);
        // setProfileData(res);
        return res;
      })
      .then((data) => {
        console.log(data);
                setBackendData({
                    name: data.name,
                    about: data.about
                });
                console.log(backendData);
      });
    }

    return (
        <div className="container main-container">
            <h1 className='huge-text main-title dark-primary-text'>J.E.D.I</h1>
            <div className="large-text slogan">
                <p>Join</p>
                <p>Educate</p>
                <p>Discover</p>
                <p>Invest</p>
            </div>
            <Link to="/pages/tutorial">
                <button className='large-rounded-btn dark-primary-bg white-text'>Tutorial</button>
            </Link>
            <Link to="/pages/search">
                <button className='large-rounded-btn dark-secondary-bg white-text'>Get Started</button>
            </Link>

            <button className='large-rounded-btn dark-secondary-bg white-text'onClick={testing}>Click To Test Backend</button>
            <div className="large-text">
                <p>Name: {backendData.name}</p>
                <p>About: {backendData.about}</p>
            </div>
        </div>
    );
}

export default LandingPage;
import React, {useState} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {ReactComponent as backIcon} from "../public/BackArrow.svg";

function Layout() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState('Heading');
  return (
    <>
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}><img src="/BackArrow.svg" alt="back arrow"/></button>
        <h1 className="heading">{heading}</h1>
      </div>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </>
  );
}
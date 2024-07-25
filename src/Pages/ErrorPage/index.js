import React from "react";
import "../ErrorPage/errorPage.scss";

import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="main">
        <h1>Opps !</h1>
        <h1>404 Page Not Found</h1>
        <span>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</span>
        <div className="redirect-btn">  
          <NavLink to={"/"}>Go to Home Page</NavLink>
          <NavLink to={"/contact"}>Contact Us</NavLink>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;

import React, { useState } from "react";
import "./header.scss";
import logo from "../../assets/img/Logo.png";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Header() {
  const [header, setHeader] = useState(false);

  const logout = () => {
    localStorage.removeItem("isLogin")
    toast.success("Logout Successfully !");
  };

  return (
    <>
      <header>
        <Toaster position="top-center" reverseOrder={true} />

        <div className="container">
          <div className="header-alignment">
            <NavLink to="/">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
            </NavLink>
            <div className="menu">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/product">Product</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {localStorage.getItem("isLogin") ? (
                <NavLink
                  to="/login"
                  className="login-btn"
                  onClick={logout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login" className="login-btn">
                  Login
                </NavLink>
              )}
            </div>
            <div className="mobile-menu" onClick={() => setHeader(!header)}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </header>
      <div className={header ? "mobile-header show" : "mobile-header hide"}>
        <div className="header-sm">
          <div className="logo" onClick={() => setHeader(false)}>
            <img src={logo} alt="logo" />
          </div>
          <i onClick={() => setHeader(false)} class="fa-solid fa-xmark"></i>
        </div>
        <div className="header-body">
          <NavLink onClick={() => setHeader(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setHeader(false)} to="/product">
            Product
          </NavLink>
          <NavLink onClick={() => setHeader(false)} to="/about">
            About
          </NavLink>

          <NavLink onClick={() => setHeader(false)} to="/contact">
            Contact
          </NavLink>

          {localStorage.getItem("isLogin") ? (
            <NavLink
              to="/login"
              className="login-btn"
              onClick={() => localStorage.removeItem("isLogin")}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login" className="login-btn">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}

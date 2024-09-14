import React, { useEffect, useState } from "react";
import "./header.scss";
import logo from "../../assets/img/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header() {
  const [header, setHeader] = useState(false);
  const [localStorageData, setLocalStorageData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    setLocalStorageData(data);
  }, []);

  const clearAllStorage = () => {
    localStorage.clear();

    sessionStorage.clear();

    toast.success("Logout Successfully !");
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <NavLink to="/branch">Branch</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

              {localStorageData.role === "user" ||
              localStorageData.role === "dealer" ? (
                <div className="profile">
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    onMouseEnter={handleClick}
                  >
                    <i className="fa-solid fa-user"></i>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onMouseLeave={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/profile" className="option-Btn">
                        <i className="fa-solid fa-user"></i> Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/cart" className="option-Btn">
                        <i className="fa-solid fa-cart-shopping"></i> Cart
                      </NavLink>
                    </MenuItem>

                    <MenuItem onClick={clearAllStorage} className="option-Btn">
                      <NavLink className="option-Btn">
                        <i className="fa-solid fa-right-to-bracket"></i> Logout
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <NavLink to="/login" className="login-btn">
                  Login
                </NavLink>
              )}

            <div className="mobile-menu" onClick={() => setHeader(!header)}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </header>
      <div className={header ? "mobile-header show" : "mobile-header hide"}>
        <div className="header-sm">
          <div className="logo" onClick={() => setHeader(false)}>
            <img src={logo} alt="logo" />
          </div>
          <i onClick={() => setHeader(false)} className="fa-solid fa-xmark"></i>
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

          <NavLink onClick={() => setHeader(false)} to="/branch">
            Branch
          </NavLink>
          <NavLink onClick={() => setHeader(false)} to="/contact">
            Contact
          </NavLink>

          <NavLink onClick={() => setHeader(false)} to="/profile">
            Profile
          </NavLink>

          {localStorageData.role === "user" || localStorageData.role === "dealer" ? (
            <NavLink
              to="/cart"
              onClick={() => setHeader(false)}
              className="cart"
            >
              Cart
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setHeader(false)}
              className="login-btn"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}

import { NavLink } from "react-router-dom";
import "./footer.scss";
import logo from '../../assets/img/Logo.png'; 

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footer-alignment">
            <div className="first-contnet">
              <NavLink to="/">
                <div className="logo">
                  <img src={logo} alt='Logo' />
                </div>
              </NavLink>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
            <div>
              <h2>Site Links</h2>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/product">Product</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
            <div>
              <h2>Get In Touch!</h2>
              <div className="icon-text">
                <i class="fa-solid fa-phone"></i>
                <a href="#">(416) 888-0874</a>
              </div>
              <div className="icon-text">
                <i class="fa-solid fa-phone"></i>
                <a href="#">(416) 888-0874</a>
              </div>
              <div className="icon-text">
                <i class="fa-solid fa-envelope"></i>
                <a href="mailto:light@gmail.com">light@gmail.com</a>
              </div>
            </div>
            <div>
              <h2>Contact Us</h2>
              <a href="#">Get started today</a>
              <div className="social-icon-alignment">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-linkedin"></i>
                <i class="fa-brands fa-twitter"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copy-right">
        <div className="container">
          <p>
            Copyright © 2024 Ekanstech, All rights reserved. Powered by{" "}
            <a href="#">Ekanstech Solustion</a>
          </p>
        </div>
      </div>
    </div>
  );
}

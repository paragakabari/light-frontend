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
              Discover the perfect blend of style and functionality with IMAGE LIGHT your destination for exceptional lighting, decor, and electrical solutions.
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
                <i className="fa-solid fa-phone"></i>
                <a className="contectLink" href="tel:+918320309635">(+91) 83203 09635</a>
              </div>
              <div className="icon-text">
                <i className="fa-solid fa-phone"></i>
                <a className="contectLink" href="tel:+919512589707">(+91) 95125 89707</a>
              </div>
              <div className="icon-text">
                <i className="fa-solid fa-envelope"></i>
                <a className="contectLink" href="mailto:imagelight84@gmail.com">imagelight84@gmail.com</a>
              </div>
            </div>
            <div>
              <h2>Contact Us</h2>
              <NavLink >Get started today</NavLink>
              <div className="social-icon-alignment">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copy-right">
        <div className="container">
          <p>
            Copyright © 2024 Imagelights, All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

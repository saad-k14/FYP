import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="light-footer skin-light-footer">
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="footer-widget">
                <img
                  src="assets/images/logo.png"
                  className="img-footer"
                  alt=""
                />
                <div className="footer-add">
                  <p>
                    Jasmine Block, Bahria Town, Lahore
                    <br /> Pakistan (PK)
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <br />
                    <a href="#">hello@dibuzz.com</a>
                  </p>
                  <p>
                    <strong>Call:</strong>
                    <br />
                    +92 320 4747459
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div className="footer-widget">
                <h4 className="widget-title">Navigations</h4>
                <ul className="footer-menu">
                  <li>
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/contact">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-2">
              <div className="footer-widget">
                <h4 className="widget-title">Connect</h4>
                <ul className="footer-menu">
                  <li>
                    <Link to="/login">
                      <i className="ti-user mr-1"></i>
                      <span className="dn-lg">Login/Register</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-2">
              <div className="footer-widget">
                <h4 className="widget-title">Search</h4>
                <ul className="footer-menu">
                  <li>
                    <Link className="nav-link" to="/categoriesSearch">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/businessSearch">
                      Businesses
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p className="mb-0">
                © 2020 Dibuzz. Designd By Team Dibuzz. All Rights Reserved
              </p>
            </div>

            <div className="col-lg-6 col-md-6 text-right">
              <ul className="footer-bottom-social">
                <li>
                  <a href="#">
                    <i className="ti-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

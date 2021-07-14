import React from "react";

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
                    Collins Street West, Victoria,
                    <br /> Australia (AU4578).
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <br />
                    <a href="#">hello@workstock.com</a>
                  </p>
                  <p>
                    <strong>Call:</strong>
                    <br />
                    91 855 742 62548
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div className="footer-widget">
                <h4 className="widget-title">Navigations</h4>
                <ul className="footer-menu">
                  <li>
                    <a href="#">New Home Design</a>
                  </li>
                  <li>
                    <a href="#">Browse Candidates</a>
                  </li>
                  <li>
                    <a href="#">Browse Employers</a>
                  </li>
                  <li>
                    <a href="#">Advance Search</a>
                  </li>
                  <li>
                    <a href="#">Job With Map</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-2">
              <div className="footer-widget">
                <h4 className="widget-title">The Highlights</h4>
                <ul className="footer-menu">
                  <li>
                    <a href="#">Home Page 2</a>
                  </li>
                  <li>
                    <a href="#">Home Page 3</a>
                  </li>
                  <li>
                    <a href="#">Home Page 4</a>
                  </li>
                  <li>
                    <a href="#">Home Page 5</a>
                  </li>
                  <li>
                    <a href="#">LogIn</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-2">
              <div className="footer-widget">
                <h4 className="widget-title">My Account</h4>
                <ul className="footer-menu">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li>
                    <a href="#">Applications</a>
                  </li>
                  <li>
                    <a href="#">Packages</a>
                  </li>
                  <li>
                    <a href="#">resume.html</a>
                  </li>
                  <li>
                    <a href="#">SignUp Page</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-3">
              <div className="footer-widget">
                <h4 className="widget-title">Download Apps</h4>
                <a href="#" className="other-store-link">
                  <div className="other-store-app">
                    <div className="os-app-icon">
                      <i className="ti-android theme-cl"></i>
                    </div>
                    <div className="os-app-caps">
                      Google Play
                      <span>Get It Now</span>
                    </div>
                  </div>
                </a>
                <a href="#" className="other-store-link">
                  <div className="other-store-app">
                    <div className="os-app-icon">
                      <i className="ti-apple theme-cl"></i>
                    </div>
                    <div className="os-app-caps">
                      App Store
                      <span>Now it Available</span>
                    </div>
                  </div>
                </a>
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
                © 2020 Work Stocks. Designd By PixelExperts All Rights Reserved
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

import React from "react";
import { Link } from "react-router-dom";
import {
  getloggedinuser,
  isLoggedin,
  logout,
} from "../../Services/usersService";

const Header = () => {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const a = isLoggedin();
    setLoggedIn(a);
  }, [loggedIn]);
  React.useEffect(() => {
    if (loggedIn) {
      const user = getloggedinuser();
      setUser(user);
    }
  }, [loggedIn]);
  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
      <div className="container" style={{ flexWrap: "nowrap" }}>
        <a className="navbar-brand" href="#">
          <img
            src="assets/images/logo.png"
            className="logo hd-992"
            alt=""
            width="50%"
          />
        </a>
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navcol-1"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categoriesSearch">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/businessSearch">
                Businesses
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            {loggedIn === true && (
              <li>
                {user.role === "business" ? (
                  <Link className="nav-link" to="/createProfile">
                    My Profile
                  </Link>
                ) : (
                  <Link className="nav-link" to="/customerProfile">
                    My Profile
                  </Link>
                )}
              </li>
            )}
          </ul>
          <ul className="nav-menu nav-menu-social align-to-right">
            {loggedIn === false ? (
              <li>
                <Link to="/login">
                  <i className="ti-user mr-1"></i>
                  <span className="dn-lg">Login/Register</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={logout}>
                  <i className="ti-user mr-1"></i>
                  <span className="dn-lg">Logout</span>
                </Link>
              </li>
            )}

            {user.role === "business" ? (
              <li className="add-listing theme-bg">
                <Link to="/customerRequests">
                  <i className="ti-plus"></i> Customer Requests
                </Link>
              </li>
            ) : (
              <li className="add-listing theme-bg">
                {loggedIn === false ? (
                  <Link to="/login">
                    <i className="ti-plus"></i> Post Request
                  </Link>
                ) : (
                  <Link to="/postRequest">
                    <i className="ti-plus"></i> Post Request
                  </Link>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

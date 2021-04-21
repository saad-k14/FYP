import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import NotFound from "./components/NotFound";
import ContactUs from "./components/ContactUs";
//import Menu from "./components/MainBar";
import NavBar from "./components/NavBar";
import Businesspage from "./components/BusinessAccount/BusinessMain";
import Checkrequests from "./components/BusinessAccount/CheckRequests";
import sendrequest from "./components/CustomerAccount/SendRequest";
import customerpage from "./components/CustomerAccount/CustomerMain";
import searchbusiness from "./components/CustomerAccount/SearchBusinesses";
//import BusinessMenu from "./components/BusinessAccount/BusinessBar";

//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1 className="title">Dibuzz</h1>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/ContactUs" component={ContactUs} />

          <Route path="/business/checkrequests" component={Checkrequests} />
          <Route path="/business" component={Businesspage} />

          <Route path="/customer/sendrequest" component={sendrequest} />
          <Route path="/customer/searchbusiness" component={searchbusiness} />
          <Route path="/customer" component={customerpage} />

          <Route path="/Not-Found" component={NotFound} />
          <Redirect to="/Not-Found" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

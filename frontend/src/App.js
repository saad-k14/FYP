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

import Categories from "./components/categories/Categories";

//import BusinessMenu from "./components/BusinessAccount/BusinessBar";

import B_Login from "./components/auth/Business/BusinessLogin";
import B_Register from "./components/auth/Business/BusinessRegister";

import C_Login from "./components/auth/Customer/CustomerLogin";
import C_Register from "./components/auth/Customer/CustomerRegister";

import { ToastContainer, toast } from "react-toastify";

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

          <Route path="/categories" component={Categories} />

          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/ContactUs" component={ContactUs} />

          <Route path="/business/login" exact component={B_Login} />
          <Route path="/business/register" exact component={B_Register} />

          <Route path="/business/checkrequests" component={Checkrequests} />
          <Route path="/business" exact component={Businesspage} />

          <Route path="/customer/login" exact component={C_Login} />
          <Route path="/customer/register" exact component={C_Register} />

          <Route path="/customer/sendrequests" component={sendrequest} />
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

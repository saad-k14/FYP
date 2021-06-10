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

import GoogleApiWrapper from "./components/maps";

import Businesspage from "./components/BusinessAccount/BusinessMain";
import Checkrequests from "./components/BusinessAccount/CheckRequests";
import sendrequest from "./components/CustomerAccount/SendRequest";
import customerpage from "./components/CustomerAccount/CustomerMain";
import Searchbusiness from "./components/CustomerAccount/SearchBusinesses";

import Categories from "./components/categories/Categories";
import NewCategory from "./components/categories/NewCategory";
import UpdateCategory from "./components/categories/UpdateCategory";

// import Requests from "./components/requests/Requests";
import Requests from "./components/CustomerAccount/Requests";
import NewRequest from "./components/requests/NewRequest";
//import UpdateRequest from "./components/requests/UpdateRequest";
import UpdateRequest from "./components/CustomerAccount/UpdateRequest";

//import BusinessMenu from "./components/BusinessAccount/BusinessBar";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import B_Login from "./components/auth/Business/BusinessLogin";
// import B_Register from "./components/auth/Business/BusinessRegister";

// import C_Login from "./components/auth/Customer/CustomerLogin";
// import C_Register from "./components/auth/Customer/CustomerRegister";

import { ToastContainer, toast } from "react-toastify";

import { Box, Container } from "@material-ui/core";
import { palette } from "@material-ui/system";

//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <Router>
      <Container maxWidth="xl">
        <div className="App">
          <Box bgcolor="info.main">
            <h1 className="title">Dibuzz</h1>
            <NavBar />
            <Switch>
              <Route path="/" exact component={HomePage} />

              <Route path="/categories/newcategory" component={NewCategory} />
              <Route path="/categories/update/:id" component={UpdateCategory} />
              <Route exacy path="/categories" component={Categories} />

              <Route path="/requests/newrequest" component={NewRequest} />
              <Route path="/requests/update/:id" component={UpdateRequest} />
              {/* <Route exacy path="/requests" component={Requests} /> */}

              <Route path="/AboutUs" component={AboutUs} />
              <Route path="/ContactUs" component={ContactUs} />

              <Route path="/maps" component={GoogleApiWrapper} />

              {/* <Route path="/business/login" component={B_Login} />
          <Route path="/business/register" component={B_Register} /> */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              <Route path="/business/checkrequests" component={Checkrequests} />
              <Route path="/business" exact component={Businesspage} />

              {/* <Route path="/customer/login" exact component={C_Login} />
          <Route path="/customer/register" exact component={C_Register} /> */}

              <Route path="/customer/sendrequests" component={sendrequest} />
              <Route
                path="/customer/request/update/:id"
                component={UpdateRequest}
              />
              <Route path="/customer/requests" component={Requests} />
              <Route
                path="/customer/searchbusiness"
                component={Searchbusiness}
              />
              <Route path="/customer" component={Searchbusiness} />

              <Route path="/Not-Found" component={NotFound} />
              <Redirect to="/Not-Found" />
            </Switch>
          </Box>
        </div>
      </Container>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Categories from "./Components/Admin/Categories/Categories";
import Dashboard from "./Components/Admin/Dashboard";
import AdminLogin from "./Components/Admin/AdminLogin";
import Home from "./Components/Home";
import Login from "./Components/Login";
import BusinessSignup from "./Components/BusinessUser/BusinessSignup";
import CreateProfile from "./Components/BusinessUser/CreateProfile";
import BusinessSearch from "./Components/BusinessSearch";
import BusinessDetail from "./Components/BusinessDetail";
import UserRegister from "./Components/UserRegister";
import ContactUs from "./Components/ContactUs";
import PostRequest from "./Components/PostRequest";
import MyRequests from "./Components/MyRequests";
import Requests from "./Components/Admin/Requests/Requests";
import CustomerRequests from "./Components/BusinessUser/CustomerRequests";
import CategoriesSearch from "./Components/CategoriesSearch";
import SingleRequest from "./Components/BusinessUser/SingleRequest";
import SingleUserRequest from "./Components/SingleUserRequest";
import Chat from "./Components/Chat";
import CustomerProfile from "./Components/CustomerProfile";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/businessRegister" component={BusinessSignup}></Route>
      <Route exact path="/contact" component={ContactUs}></Route>
      <Route exact path="/userRegister" component={UserRegister}></Route>
      <Route exact path="/postRequest" component={PostRequest}></Route>
      <Route exact path="/myRequests" component={MyRequests}></Route>
      <Route
        exact
        path="/singleUserRequest"
        component={SingleUserRequest}
      ></Route>
      <Route
        exact
        path="/customerRequests"
        component={CustomerRequests}
      ></Route>
      <Route exact path="/singleRequest" component={SingleRequest}></Route>
      <Route exact path="/requests" component={Requests}></Route>
      <Route exact path="/adminLogin" component={AdminLogin}></Route>
      <Route exact path="/adminDashboard" component={Dashboard}></Route>
      <Route exact path="/categories" component={Categories}></Route>
      <Route
        exact
        path="/categoriesSearch"
        component={CategoriesSearch}
      ></Route>
      <Route exact path="/createProfile" component={CreateProfile}></Route>
      <Route exact path="/customerProfile" component={CustomerProfile}></Route>
      <Route exact path="/businessSearch" component={BusinessSearch}></Route>
      <Route exact path="/businessDetail" component={BusinessDetail}></Route>
      <Route exact path="/chat" component={Chat}></Route>
    </Router>
  );
}

export default App;

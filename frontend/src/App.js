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
import Menu from "./components/MainBar";

//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/ContactUs" component={ContactUs} />

          <Route path="/Not-Found" component={NotFound} />
          <Redirect to="/Not-Found" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import AboutUs from "./components/AboutUs";
import { BrowserRouter as Router } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Lets do this</h1>
        <AboutUs />
      </div>
    </Router>
  );
}

export default App;

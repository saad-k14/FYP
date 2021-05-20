import React from "react";
import BusinessServices from "../services/BusinessService";
import CustomerServices from "../services/CustomerService";
const HomePage = () => {
  React.useEffect(() => {
    if (BusinessServices.isLoggedIn()) {
      window.location.href = "/business";
    }
    if (CustomerServices.isLoggedIn()) {
      window.location.href = "/customer";
    }
  }, []);
  return (
    <div className="Homeback">
      <h1>this is the homepage of dibuzz ayyyyy</h1>
    </div>
  );
};

export default HomePage;

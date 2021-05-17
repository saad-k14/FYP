import React, { useEffect, useState } from "react";
import CustomerServices from "../../services/CustomerService";
const Customerpage = () => {
  const [user, setUser] = useState({});

  return (
    <div className="Customerback">
      <h1>This is the main page for customers</h1>
      <h2>Name: {CustomerServices.getLoggedInUser().name}</h2>
    </div>
  );
};
export default Customerpage;

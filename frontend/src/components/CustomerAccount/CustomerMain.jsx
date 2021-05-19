import React, { useEffect, useState } from "react";
import CustomerServices from "../../services/CustomerService";
import CustomerUserAuth from "../auth/CustomerUserAuth";
const Customerpage = () => {
  const [user, setUser] = useState({});
  React.useEffect(() => {
    const user = CustomerServices.getLoggedInUser();
    //   if (!user) window.location.href = "/login";
    setUser(user);
  }, []);

  return (
    // <CustomerUserAuth>
    <div className="Customerback">
      <h1>This is the main page for customers</h1>
      <h2>Name: {user.name}</h2>
    </div>
    //</CustomerUserAuth>
  );
};
export default Customerpage;

import React, { useEffect, useState } from "react";
import BusinessServices from "../../services/BusinessService";
import BusinessUserAuth from "../auth/BusinessUserAuth";
const Businesspage = (props) => {
  const [user, setUser] = useState({});
  React.useEffect(() => {
    const users = BusinessServices.getLoggedInUser();
    if (!users) window.location.href = "/login";
    setUser(users);
  }, []);
  return (
    //  <BusinessUserAuth>
    <div className="Businessback">
      <h1>This is the profile page for a business account</h1>
      <h2>Name: {user.name}</h2>
      <p>Category: {user.categories}</p>
    </div>
    //  </BusinessUserAuth>
  );
};

export default Businesspage;

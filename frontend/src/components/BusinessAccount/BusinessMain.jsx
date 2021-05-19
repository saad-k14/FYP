import React, { useEffect, useState } from "react";
import BusinessServices from "../../services/BusinessService";
import BusinessUserAuth from "../auth/Business/BusinessUserAuth";
const Businesspage = (props) => {
  const [user, setUser] = useState({});
  /*React.useEffect(() => {
    const user = BusinessServices.getLoggedInUser();
    if (!user) window.location.href = "/business/login";
    setUser(user);
  }, []);*/
  return (
    <BusinessUserAuth>
      <div className="Businessback">
        <h1>This is the profile page for a business account</h1>
        <h2>Name: {user.name}</h2>
        <p>Category: {user.categories}</p>
      </div>
    </BusinessUserAuth>
  );
};

export default Businesspage;

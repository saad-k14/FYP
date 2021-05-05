import React, { useEffect, useState } from "react";
import BusinessService from "../../services/BusinessService";
const Businesspage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    BusinessService.getBusinessUser("bleh").then((data) => {
      setUser(data);
    });
  }, []);
  return (
    <div className="Businessback">
      <h1>This is the profile page for a business account</h1>
      <h2>Name: {user.name}</h2>
      <p>Category: {user.categories}</p>
    </div>
  );
};

export default Businesspage;

import React, { useEffect, useState } from "react";
import BusinessServices from "../../services/BusinessService";
const Businesspage = () => {
  const [user, setUser] = useState({});

  /*useEffect(() => {
    BusinessService.getBusinessUser("malikmahroze").then((data) => {
      setUser(data);
    });
  }, []);*/
  return (
    <div className="Businessback">
      <h1>This is the profile page for a business account</h1>
      <h2>Name: {BusinessServices.getLoggedInUser().name}</h2>
      <p>Category: {BusinessServices.getLoggedInUser().categories}</p>
    </div>
  );
};

export default Businesspage;

import React from "react";
import BusinessServices from "../../../services/BusinessService";
import { withRouter } from "react-router";
const BusinessUserAuth = (props) => {
  React.useEffect(() => {
    console.log(BusinessServices.isLoggedIn());
    if (!BusinessServices.isLoggedIn()) {
      window.location.href = "/business/login";
    }
  }, []);
  return <>{props.children}</>;
};

export default withRouter(BusinessUserAuth);

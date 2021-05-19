import React from "react";
import CustomerServices from "../../services/CustomerService";
import { withRouter } from "react-router";
const CustomerUserAuth = (props) => {
  React.useEffect(() => {
    if (!CustomerServices.isLoggedIn()) {
      window.location.href = "/login";
    }
  }, []);
  return <>{props.children}</>;
};

export default withRouter(CustomerUserAuth);

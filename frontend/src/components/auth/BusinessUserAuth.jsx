import React from "react";
import BusinessServices from "../../services/BusinessService";
import { withRouter } from "react-router";
const BusinessUserAuth = (props) => {
  React.useEffect(() => {
    if (!BusinessServices.isLoggedIn()) {
      window.location.href = "/login";
    }
  }, []);
  return <>{props.children}</>;
};

export default withRouter(BusinessUserAuth);

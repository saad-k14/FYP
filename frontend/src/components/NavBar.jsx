import React from "react";
import Menu from "./MainBar";
import BusinessMenu from "./BusinessAccount/BusinessBar";
import CustomerMenu from "./CustomerAccount/CustomerBar";

class NavBar extends React.Component {
  render() {
    if (window.location.href.indexOf("/business") > -1) {
      return <BusinessMenu />;
    }
    if (window.location.href.indexOf("/Customer") > -1) {
      return <CustomerMenu />;
    }
    return <Menu />;
  }
}
export default NavBar;

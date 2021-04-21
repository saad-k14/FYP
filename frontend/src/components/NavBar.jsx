import React from "react";
import Menu from "./MainBar";
import BusinessMenu from "./BusinessAccount/BusinessBar";
import CustomerMenu from "./CustomerAccount/CustomerBar";

class NavBar extends React.Component {
  render() {
    if (window.location.href.indexOf("/business") > -1) {
      <BusinessMenu />;
    }
    if (window.location.href.indexOf("/customer") > -1) {
      console.log(window.location.href);
      <CustomerMenu />;
    }

    return <Menu />;
  }
}
export default NavBar;

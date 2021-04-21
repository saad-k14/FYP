import React from "react";
import Menu from "./MainBar";
import BusinessMenu from "./BusinessAccount/BusinessBar";

class NavBar extends React.Component {
  render() {
    if (window.location.href.indexOf("/business") > -1) return <BusinessMenu />;
    return <Menu />;
  }
}
export default NavBar;

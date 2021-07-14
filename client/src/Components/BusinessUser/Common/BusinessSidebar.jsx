import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../Services/usersService";

const BusinessSidebar = (props) => {
  const { fullName, image } = props;
  return (
    <div className="col-md-4 col-sm-12">
      <div className="dashboard-wrap">
        <div className="dashboard-thumb">
          <div className="dashboard-th-pic myImgContainer">
            <img
              src={"http://localhost:4000/api/users/profilePicture/" + image}
              className="img-fluid mx-auto img-circle"
              alt=""
            />
          </div>
          <h4 className="mb-1">{fullName}</h4>
          <span className="text-success">Business Profile</span>
        </div>
        <ul className="nav dashboard-verticle-nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/createProfile">
              <i className="ti-user"></i>Business Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customerRequests">
              <i className="ti-file"></i>Customer Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={logout}>
              <i className="lni-exit"></i>Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BusinessSidebar;

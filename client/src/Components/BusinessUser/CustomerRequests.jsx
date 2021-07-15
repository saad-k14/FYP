import React from "react";
import Header from "../Common/Header";
import Newsletter from "../Common/Newsletter";
import Footer from "../Common/Footer";
import BusinessSidebar from "./Common/BusinessSidebar";
import { getloggedinuser } from "../../Services/usersService";
import { getBusinessRequests } from "../../Services/requestsService";
import { Link } from "react-router-dom";

const CustomerRequests = (props) => {
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [requests, setRequests] = React.useState([]);

  const getRequestsData = async () => {
    if (userId != "") {
      const { data } = await getBusinessRequests(userId);
      const requests = [...data];
      setRequests(requests);
    }
  };
  const getUserDetails = () => {
    const user = getloggedinuser();
    if (user) {
      setUser(user);
      setUserId(user._id);
      setFullName(user.name);
    }
  };
  const checkRequests = (request) => {
    if (request.acceptedBy.some((el) => el.userId === userId)) {
      return true;
    }
    return false;
  };

  const getDate = (projectDate) => {
    var date = new Date(projectDate);
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getMonth()];
    var str = date.getDay() + " " + month + " " + date.getFullYear();
    return str;
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);
  React.useEffect(() => {
    getRequestsData();
  }, [userId]);
  return (
    <>
      <Header />
      <div className="clearfix"></div>
      <div className="page-title-wrap">
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="pt-caption">
              <h1>Hello! {fullName}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <section className="tr-single-detail gray-bg">
        <div className="container">
          <div className="row">
            <BusinessSidebar fullName={fullName} image={user.profilePhoto} />
            <div className="col-md-8 col-sm-12">
              <div className="tab-content">
                <div className="tab-pane active container" id="applied">
                  <div className="tr-single-box">
                    <div className="tr-single-header">
                      <h4>
                        <i className="ti-briefcase"></i> Customer Requests
                      </h4>
                    </div>
                    {requests.map((request) => (
                      <div className="tr-single-body" key={request._id}>
                        <div className="manage-list">
                          <div className="mg-list-wrap">
                            <div className="mg-list-thumb">
                              <img
                                src="http://localhost:4000/api/categories/icon/smartphone.png"
                                className="mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="mg-list-caption">
                              <h4 className="mg-title">{request.title}</h4>
                              {checkRequests(request) === true ? (
                                <span class="cl-jb-type full-time">
                                  Accepted
                                </span>
                              ) : (
                                <span class="cl-jb-type part-time">
                                  Pending
                                </span>
                              )}
                              <span className="d-block ">
                                {"Due on " + getDate(request.projectDate)} |
                                {" Rs " +
                                  request.minBudget +
                                  " - " +
                                  request.maxBudget}
                              </span>
                            </div>
                          </div>

                          <div className="mg-action">
                            <div className="btn-group ml-2">
                              <Link
                                to={{
                                  pathname: "/singleRequest",
                                  state: { request: request },
                                }}
                                className="btn btn-view"
                                title="View Job"
                              >
                                <i className="ti-eye"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CustomerRequests;

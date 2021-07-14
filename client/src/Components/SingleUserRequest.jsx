import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import { getloggedinuser, getUser } from "../Services/usersService";
import {
  acceptRequest,
  getBusinessUsersWhoAccepted,
  ignoreRequest,
} from "../Services/requestsService";
import { Link } from "react-router-dom";

const SingleUserRequest = (props) => {
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [usersWhoAccepted, setUsersWhoAccepted] = React.useState([]);
  const { request } = props.location.state;

  const getLoggedInUserDetails = () => {
    const user = getloggedinuser();
    if (user) {
      setUserId(user._id);
      setUser(user);
    }
  };
  const getUsersWhoAccepted = async () => {
    const { data } = await getBusinessUsersWhoAccepted(request._id);
    const users = [...data];
    setUsersWhoAccepted(users);
  };
  const checkMyResponse = () => {
    if (request.acceptedBy.some((el) => el.userId === userId)) {
      return true;
    } else {
      return false;
    }
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
    getLoggedInUserDetails();
    checkMyResponse();
    getUsersWhoAccepted();
  }, [userId]);
  var i = 0;
  return (
    <>
      <Header />
      <section
        className="page-title pt-img-wrap do-light"
        style={{
          background:
            "url('https://source.unsplash.com/random?contact/1920x800')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="9"
      >
        <div className="container">
          <div className="row m-0 align-items-end detail-swap">
            <div className="tr-list-wrap">
              <div className="tr-list-detail">
                <div className="tr-list-thumb">
                  <img
                    src="https://via.placeholder.com/400x400"
                    className="img-responsive"
                    alt=""
                  />
                </div>
                <div className="tr-list-info">
                  <h4 className="mb-1">{user.fullName}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tr-single-detail gray-bg my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-info"></i>Project Description
                  </h4>
                </div>
                <div className="tr-single-body">{request.detail}</div>
              </div>
              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-info"></i>Reference Image
                  </h4>
                </div>
                <div className="tr-single-body">
                  <a
                    href={
                      "http://localhost:4000/api/requests/referenceImage/" +
                      request.referenceImage
                    }
                    target="_blank"
                  >
                    <img
                      src={
                        "http://localhost:4000/api/requests/referenceImage/" +
                        request.referenceImage
                      }
                      width="100%"
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-info"></i>Accepted By
                  </h4>
                </div>
                {usersWhoAccepted.map((user) => (
                  <div className="tr-single-body">
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
                          <h4 className="mg-title">{user.fullName}</h4>
                          <span className="d-block">
                            Bid: Rs {request.acceptedBy[i].bidAmount} | Date:{" "}
                            {getDate(request.acceptedBy[i].dateOfCompletion)}
                          </span>
                        </div>
                      </div>

                      <div className="mg-action">
                        <div className="btn-group ml-2">
                          <div class="cll-right">
                            <Link
                              to={{
                                pathname: "/chat",
                                state: {
                                  businessUser: user,
                                },
                              }}
                              class="btn btn-primary btn-shortlist"
                            >
                              Chat
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-direction"></i> Project Detail
                  </h4>
                </div>

                <div className="tr-single-body">
                  <ul className="extra-service">
                    <li>
                      <div className="icon-box-icon-block">
                        <div className="icon-box-round">
                          <i className="ti-money"></i>
                        </div>
                        <div className="icon-box-text">
                          <strong className="d-block">Budget</strong>
                          Rs {request.minBudget} - Rs {request.maxBudget}
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="icon-box-icon-block">
                        <div className="icon-box-round">
                          <i className="ti-time"></i>
                        </div>
                        <div className="icon-box-text">
                          <strong className="d-block">Due Date</strong>
                          {getDate(request.projectDate)}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default SingleUserRequest;

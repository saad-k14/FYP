import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import CustomerSidebar from "./Common/CustomerSidebar";
import { getloggedinuser } from "../Services/usersService";
import { deleteRequest, getRequests } from "../Services/requestsService";
import { Link } from "react-router-dom";
import Notification from "./Admin/Common/Notification";

const MyRequests = (props) => {
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [requests, setRequests] = React.useState([]);

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getRequestsData = async () => {
    if (userId != "") {
      const { data } = await getRequests(userId);
      const requests = [...data];
      setRequests(requests);
    }
  };
  const getUserDetails = () => {
    const user = getloggedinuser();
    if (user) {
      setUserId(user._id);
      setFullName(user.name);
      setUser(user);
    }
  };

  const onDelete = async (id) => {
    await deleteRequest(id).then(() => {
      setNotify({
        isOpen: true,
        message: "Request Deleted Successfully",
        type: "success",
      });
      getRequestsData();
    });
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
            <CustomerSidebar fullName={fullName} image={user.profilePhoto} />
            <div className="col-md-8 col-sm-12">
              <div className="tab-content">
                <div className="tab-pane active container" id="applied">
                  <div className="tr-single-box">
                    <div className="tr-single-header">
                      <h4>
                        <i className="ti-briefcase"></i> Requests
                      </h4>
                    </div>
                    {requests.map((request) => (
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
                              <h4 className="mg-title">{request.title}</h4>
                              {request.acceptedBy.length > 0 ? (
                                <span className="d-block text-success">
                                  Accepted by {request.acceptedBy.length}.
                                </span>
                              ) : (
                                <span
                                  className={
                                    request.status === "Pending"
                                      ? "d-block text-warning"
                                      : request.status === "Ignored"
                                      ? "d-block text-danger"
                                      : "d-block text-info"
                                  }
                                >
                                  {request.status}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mg-action">
                            <div className="btn-group ml-2">
                              <Link
                                to={{
                                  pathname: "/singleUserRequest",
                                  state: { request: request },
                                }}
                                className="btn btn-view"
                                title="View Job"
                              >
                                <i className="ti-eye"></i>
                              </Link>
                              {request.status === "Ignored" ||
                              request.status === "Pending" ? (
                                <Link
                                  onClick={() => onDelete(request._id)}
                                  className="mg-delete ml-2"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Delete"
                                >
                                  <i className="ti-trash"></i>
                                </Link>
                              ) : (
                                ""
                              )}
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
      <Notification notify={notify} setNotify={setNotify}></Notification>
      <Footer />
    </>
  );
};

export default MyRequests;

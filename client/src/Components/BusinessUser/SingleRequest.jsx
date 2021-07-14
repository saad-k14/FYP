import React from "react";
import Header from "../Common/Header";
import Newsletter from "../Common/Newsletter";
import Footer from "../Common/Footer";
import { getloggedinuser, getUser } from "../../Services/usersService";
import { acceptRequest, ignoreRequest } from "../../Services/requestsService";

const SingleRequest = (props) => {
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [bidAmount, setBidAmount] = React.useState(0);
  const [dateOfCompletion, setDateOfCompletion] = React.useState("");
  const [details, setDetails] = React.useState("");
  const { request } = props.location.state;

  const getUserDetails = async (userId) => {
    const { data } = await getUser(userId);
    setUser(data);
  };
  const getLoggedInUserDetails = () => {
    const user = getloggedinuser();
    if (user) {
      setUserId(user._id);
    }
  };
  const onIgnore = async (id, userId) => {
    await ignoreRequest(id, userId).then(() => {
      props.history.push("/customerRequests");
    });
  };
  const onAccept = async (e, id) => {
    e.preventDefault();
    await acceptRequest(id, {
      userId,
      bidAmount,
      dateOfCompletion,
      details,
    }).then(() => {
      props.history.push("/customerRequests");
    });
  };
  const checkMyResponse = () => {
    if (request.acceptedBy.some((el) => el.userId === userId)) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    getUserDetails(request.userId);
    getLoggedInUserDetails();
    checkMyResponse();
  }, []);
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
                  <div className="overall-rate">4.7</div>
                </div>
                <div className="tr-list-info">
                  <h4 className="mb-1">{user.fullName}</h4>
                  {/* <p className="mb-1 text-warning">UI/UX & Product Designer</p>
                  <p className="mb-1">
                    <i className="ti-location-pin mr-2"></i>Blick Market, USA
                  </p> */}
                </div>
              </div>
              <div className="listing-detail_right">
                {checkMyResponse() === true ? (
                  ""
                ) : (
                  <div className="listing-detail-item">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#login"
                      //   onClick={() => onAccept(request._id, loggedInUser)}
                      className="btn full-width mb-2 btn-info"
                    >
                      <i className="ti-check mr-2"></i> Accept Request
                    </a>
                    <br />
                    <button
                      onClick={() => onIgnore(request._id, userId)}
                      className="btn btn-danger full-width"
                    >
                      <i className="ti-close mr-2"></i> Ignore Request
                    </button>
                  </div>
                )}
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
                          {request.projectDate}
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
      <div
        className="modal fade"
        id="login"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registermodal"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered login-pop-form"
          role="document"
        >
          <div className="modal-content" id="registermodal">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="ti-close"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <h4 className="modal-header-title">Response</h4>

              <div className="login-form">
                <form>
                  <div className="form-group">
                    <label>Bid Amount</label>
                    <div className="input-with-gray">
                      <input
                        value={bidAmount}
                        onChange={(e) => {
                          setBidAmount(e.target.value);
                        }}
                        type="number"
                        className="form-control"
                        placeholder="Bid Amount"
                      />
                      <i className="ti-money theme-cl"></i>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Date</label>
                    <div className="input-with-gray">
                      <input
                        value={dateOfCompletion}
                        onChange={(e) => {
                          setDateOfCompletion(e.target.value);
                        }}
                        type="date"
                        className="form-control"
                        placeholder="Date"
                      />
                      <i className="ti-calendar theme-cl"></i>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Details</label>
                    <textarea
                      value={details}
                      onChange={(e) => {
                        setDetails(e.target.value);
                      }}
                      className="form-control"
                      placeholder="Details"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <button
                      onClick={(e) => onAccept(e, request._id)}
                      type="submit"
                      className="btn btn-primary btn-md full-width pop-login"
                    >
                      Submit Response
                    </button>
                  </div>
                </form>
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

export default SingleRequest;

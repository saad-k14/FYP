import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import _ from "lodash";
import { getloggedinuser, getUser, isLoggedin } from "../Services/usersService";
import { Link } from "react-router-dom";
import { addRating, getRatings } from "../Services/businessesService";

const BusinessDetail = (props) => {
  const [loggedIn, setLoggedIn] = React.useState("");
  const [loggedInUser, setLoggedInUser] = React.useState({});
  const [user, setUser] = React.useState({});
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [ratings, setRatings] = React.useState([]);
  const { business } = props.location.state;

  const getBusinessUserDetails = async (userId) => {
    const { data } = await getUser(userId);
    setUser(data);
    setRatings(business.ratings);
  };
  const getBusinessRating = async (businessId) => {
    const { data } = await getRatings(businessId);
    const ratings = [...data];
    setRatings(ratings);
  };

  React.useEffect(() => {
    getBusinessUserDetails(business.userId);
  }, []);

  React.useEffect(() => {
    const a = isLoggedin();
    setLoggedIn(a);
    const user = getloggedinuser();
    console.log(user);
    setLoggedInUser(user);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addRating(business._id, {
      userId: loggedInUser._id,
      rating: rating,
      comment: comment,
    }).then(() => {
      setRating(0);
      setComment("");
      getBusinessRating(business._id);
    });
  };

  return (
    <>
      <Header />
      <section
        className="small-page-title-banner"
        style={{
          backgroundImage: `url('http://localhost:4000/api/business/coverImage/${business.companyName}/${business.coverImage}')`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="tr-list-center">
              <h2>{business.slogan}</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="overlay-top p-0">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="single-job-head head-light style-1 mb-0">
                <div className="single-job-left">
                  <div className="single-job-thumb">
                    <img
                      src={
                        "http://localhost:4000/api/business/logo/" +
                        business.companyName +
                        "/" +
                        business.logo
                      }
                      alt=""
                    />
                  </div>
                  <div className="single-job-info">
                    <h4 className="single-job-title">
                      {business.companyName}
                      <span className="job-type full-time">
                        {"Since " + business.since}
                      </span>
                    </h4>
                    <span className="sj-location">
                      <i className="ti-location-pin"></i>
                      {business.city}, {business.country}
                    </span>
                    {/* <ul className="tags-jobs"> */}
                    <div style={{ color: "#ff9800" }} className="rating">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span style={{ fontWeight: "bold", color: "#555555" }}>
                        {" "}
                        5.0
                      </span>
                    </div>
                    {/* </ul> */}
                  </div>
                </div>
                <div className="single-job-apply-wrap">
                  {loggedIn === false ? (
                    <Link to="/login" className="btn apply-btn btn-primary">
                      {" "}
                      Login to Chat
                    </Link>
                  ) : loggedIn.role != "business" ? (
                    <Link
                      to={{
                        pathname: "/chat",
                        state: {
                          businessUser: user,
                        },
                      }}
                      className="btn apply-btn btn-primary"
                    >
                      {" "}
                      Chat with User
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tr-single-detail gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-info"></i>About this Business
                  </h4>
                </div>
                <div className="tr-single-body">
                  <div
                    dangerouslySetInnerHTML={{ __html: business.about }}
                  ></div>
                </div>
              </div>
              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-info"></i>Reviews
                  </h4>
                  {loggedIn === true ? (
                    loggedInUser.role != "business" ? (
                      <a
                        href="#"
                        className="btn btn-sm btn-primary"
                        data-toggle="modal"
                        data-target="#login"
                      >
                        Add Review
                      </a>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                {Object.keys(business.ratings[0]).length != 0
                  ? ratings.map((rating, index) => (
                      <div
                        className="candidate-list-layout py-1 my-3"
                        style={{ border: 0 }}
                        key={index}
                      >
                        <div className="cll-wrap">
                          <div className="align-items-center d-flex">
                            <div
                              className="cll-thumb mx-0"
                              style={{ height: "50px" }}
                            >
                              <a href="resume-detail.html">
                                <img
                                  src="https://via.placeholder.com/200x200"
                                  className="img-responsive img-circle"
                                  alt=""
                                  style={{ maxWidth: "50px" }}
                                />
                              </a>
                            </div>
                            <div className="cll-caption mt-0 px-3">
                              <h5 className="mb-0">{rating.user.fullName}</h5>
                            </div>
                            <div
                              style={{ color: "#ff9800" }}
                              className="rating"
                            >
                              <span className="fa fa-star"></span>
                              <span
                                style={{ fontWeight: "bold", color: "#555555" }}
                              >
                                {" "}
                                {rating.rating}
                              </span>
                            </div>
                          </div>
                          <p className="ml-5 pl-3">{rating.comment}</p>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              <div>
                {loggedIn === false ? (
                  <Link to="/login" className="btn btn-info full-width mb-2">
                    {" "}
                    Login to Chat
                  </Link>
                ) : loggedInUser.role != "business" ? (
                  <Link
                    to={{
                      pathname: "/chat",
                      state: {
                        businessUser: user,
                      },
                    }}
                    className="btn btn-info full-width mb-2"
                  >
                    {" "}
                    Chat with User
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12">
              {loggedIn === false ? (
                <div class="alert alert-danger">
                  <strong>Hi Dear!</strong> Please Login to see all information
                </div>
              ) : (
                ""
              )}
              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-direction"></i> User Overview
                  </h4>
                </div>

                <div className="tr-single-body">
                  <div className="job-employers-name">
                    <div className="employers-thumb-caption">
                      <div className="employers-thumb">
                        <img
                          src="https://via.placeholder.com/90x90"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <h4 className="employers-title">{user.fullName}</h4>
                    </div>
                    <div className="employers-enfo">
                      <ul>
                        <li>
                          <i className="lni lni-phone"></i>
                          <span
                            className={loggedIn === false ? "blur-text" : ""}
                          >
                            {user.phoneNumber}
                          </span>
                        </li>
                        <li>
                          <i className="ti-email"></i>
                          <span
                            className={loggedIn === false ? "blur-text" : ""}
                          >
                            {user.email}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tr-single-box">
                <div className="tr-single-header">
                  <h4>
                    <i className="ti-direction"></i> Company Address
                  </h4>
                </div>

                <div className="tr-single-body">
                  <ul className="extra-service">
                    <li>
                      <div className="icon-box-icon-block">
                        <a href="#">
                          <div className="icon-box-round">
                            <i className="lni-map-marker"></i>
                          </div>
                          <div className="icon-box-text">
                            <span
                              className={loggedIn === false ? "blur-text" : ""}
                            >
                              {business.address}, {business.city},{" "}
                              {business.country}
                            </span>
                          </div>
                        </a>
                      </div>
                    </li>

                    <li>
                      <div className="icon-box-icon-block">
                        <a href="#">
                          <div className="icon-box-round">
                            <i className="lni-phone-handset"></i>
                          </div>
                          <div className="icon-box-text">
                            <span
                              className={loggedIn === false ? "blur-text" : ""}
                            >
                              {business.phoneNumber}
                            </span>
                          </div>
                        </a>
                      </div>
                    </li>

                    <li>
                      <div className="icon-box-icon-block">
                        <a href="#">
                          <div className="icon-box-round">
                            <i className="lni-envelope"></i>
                          </div>
                          <div className="icon-box-text">
                            <span
                              className={loggedIn === false ? "blur-text" : ""}
                            >
                              {business.email}
                            </span>
                          </div>
                        </a>
                      </div>
                    </li>

                    <li>
                      <div className="icon-box-icon-block">
                        <a href="#">
                          <div className="icon-box-round">
                            <i className="lni-world"></i>
                          </div>
                          <div className="icon-box-text">
                            <span
                              className={loggedIn === false ? "blur-text" : ""}
                            >
                              {business.website}
                            </span>
                          </div>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {loggedIn === false ? (
                ""
              ) : (
                <div className="tr-single-box">
                  <div className="tr-single-header">
                    <h4>
                      <i className="ti-share"></i> Visit Social Media
                    </h4>
                  </div>

                  <div className="tr-single-body">
                    <ul className="extra-service half">
                      {business.facebookUrl != "" ? (
                        <li>
                          <div className="icon-box-icon-block">
                            <a href="#">
                              <div className="icon-box-round">
                                <i className="lni-facebook"></i>
                              </div>
                              <div className="icon-box-text">Facebook</div>
                            </a>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}
                      {business.googleUrl != "" ? (
                        <li>
                          <div className="icon-box-icon-block">
                            <a href="#">
                              <div className="icon-box-round">
                                <i className="lni-google-plus"></i>
                              </div>
                              <div className="icon-box-text">Google plus</div>
                            </a>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}

                      {business.twitterUrl != "" ? (
                        <li>
                          <div className="icon-box-icon-block">
                            <a href="#">
                              <div className="icon-box-round">
                                <i className="lni-twitter"></i>
                              </div>
                              <div className="icon-box-text">Twitter</div>
                            </a>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}

                      {business.linkedInUrl != "" ? (
                        <li>
                          <div className="icon-box-icon-block">
                            <a href="#">
                              <div className="icon-box-round">
                                <i className="lni-linkedin"></i>
                              </div>
                              <div className="icon-box-text">LinkedIn</div>
                            </a>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}

                      {business.instagramUrl != "" ? (
                        <li>
                          <div className="icon-box-icon-block">
                            <a href="#">
                              <div className="icon-box-round">
                                <i className="lni-instagram"></i>
                              </div>
                              <div className="icon-box-text">Instagram</div>
                            </a>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}

                      {business.pinterestUrl != "" ? (
                        <li>
                          <div className="icon-box-icon-block">
                            <a href="#">
                              <div className="icon-box-round">
                                <i className="fa fa-pinterest"></i>
                              </div>
                              <div className="icon-box-text">Pinterest</div>
                            </a>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
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
              <h4 className="modal-header-title">Review</h4>

              <div className="login-form">
                <form>
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating">
                      <span
                        className="fa fa-star px-1 cursor-pointer"
                        style={
                          rating == 1 ||
                          rating == 2 ||
                          rating == 3 ||
                          rating == 4 ||
                          rating == 5
                            ? { color: "#ff9800" }
                            : {}
                        }
                        onClick={() => {
                          setRating(1);
                        }}
                      ></span>
                      <span
                        className="fa fa-star px-1 cursor-pointer"
                        style={
                          rating == 2 ||
                          rating == 3 ||
                          rating == 4 ||
                          rating == 5
                            ? { color: "#ff9800" }
                            : {}
                        }
                        onClick={() => {
                          setRating(2);
                        }}
                      ></span>
                      <span
                        className="fa fa-star px-1 cursor-pointer"
                        style={
                          rating == 3 || rating == 4 || rating == 5
                            ? { color: "#ff9800" }
                            : {}
                        }
                        onClick={() => {
                          setRating(3);
                        }}
                      ></span>
                      <span
                        className="fa fa-star px-1 cursor-pointer"
                        style={
                          rating == 4 || rating == 5 ? { color: "#ff9800" } : {}
                        }
                        onClick={() => {
                          setRating(4);
                        }}
                      ></span>
                      <span
                        className="fa fa-star px-1 cursor-pointer"
                        style={rating == 5 ? { color: "#ff9800" } : {}}
                        onClick={() => {
                          setRating(5);
                        }}
                      ></span>
                      <span style={{ fontWeight: "bold", color: "#555555" }}>
                        {" "}
                        {/* 5.0 */}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Comments</label>
                    <textarea
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      className="form-control"
                      placeholder="Comments"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <button
                      onClick={(e) => handleSubmit(e)}
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
      <Footer />
    </>
  );
};

export default BusinessDetail;

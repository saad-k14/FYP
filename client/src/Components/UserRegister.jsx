import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import { userSignup } from "../Services/usersService";
import axios from "axios";
import { Link } from "react-router-dom";
import Notification from "./Admin/Common/Notification";

const UserRegister = (props) => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [profilePhoto, setProfilePhoto] = React.useState("");

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleUserRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("phoneNumber", phoneNumber);
    data.append("profilePhoto", profilePhoto);
    axios({
      method: "post",
      url: "http://localhost:4000/api/users/register/user/",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data,
          type: "warning",
        });
      });
  };

  return (
    <>
      <Header />
      <div className="clearfix"></div>
      <div
        className="page-title-wrap pt-img-wrap"
        style={{
          background: 'url("assets/images/Signup.jpeg")',
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="pt-caption text-center">
              <h1>Register User Account</h1>
              <p>
                <Link to="/">Home</Link>
                <span className="current-page">Register</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="modal-body">
                <h4 className="modal-header-title">
                  Welcome to <span>DIBUZZ</span>
                </h4>
                <div className="login-form">
                  <form>
                    <div className="form-group">
                      <label>Full Name</label>
                      <div className="input-with-gray">
                        <input
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                        />
                        <i className="ti-user"></i>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <div className="input-with-gray">
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <i className="ti-user"></i>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-with-gray">
                        <input
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          type="password"
                          className="form-control"
                          placeholder="*******"
                        />
                        <i className="ti-unlock"></i>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Confirm Password</label>
                      <div className="input-with-gray">
                        <input
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                          type="password"
                          className="form-control"
                          placeholder="*******"
                        />
                        <i className="ti-unlock"></i>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <div className="input-with-gray">
                        <input
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                        />
                        <i className="ti-unlock"></i>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Profile Picture</label>
                      <div className="custom-file">
                        <input
                          accept="image/*"
                          type="file"
                          className="custom-file-input"
                          id="logo"
                          onChange={(event) => {
                            const img = event.target.files[0];
                            setProfilePhoto(img);
                          }}
                        />
                        <label className="custom-file-label" htmlFor="logo">
                          Choose file
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        onClick={handleUserRegister}
                        type="submit"
                        className="btn btn-primary btn-md full-width pop-login"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <Link to="/businessRegister">
                    <b>REGISTER YOUR BUSINESS!!</b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
      <Footer />
    </>
  );
};

export default UserRegister;

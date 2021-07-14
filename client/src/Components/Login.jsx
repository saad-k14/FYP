import React from "react";
import { getloggedinuser, userLogin } from "../Services/usersService";
import Footer from "./Common/Footer";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Notification from "./Admin/Common/Notification";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await userLogin({
      email,
      password,
    })
      .then(() => {
        setNotify({
          isOpen: true,
          message: "Login Successful",
          type: "success",
        });
        const user = getloggedinuser(); // May be use later
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err,
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
          background: 'url("https://via.placeholder.com/1920x800")',
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="pt-caption text-center">
              <h1>Sign In Your Account</h1>
              <p>
                <a href="index.html">Home</a>
                <span className="current-page">Log In</span>
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
                      <label>Email</label>
                      <div className="input-with-gray">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <i className="ti-user"></i>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-with-gray">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <i className="ti-unlock"></i>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-md full-width pop-login"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  Do not have an account?{" "}
                  <Link to="/userRegister">
                    <b>REGISTER NOW!</b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Login;

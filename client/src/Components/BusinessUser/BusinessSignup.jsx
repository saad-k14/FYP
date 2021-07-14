import React from "react";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Newsletter from "../Common/Newsletter";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { getCategories } from "../../Services/categoriesService";
import { businessSignup } from "../../Services/usersService";
import Notification from "../Admin/Common/Notification";
import axios from "axios";

const BusinessSignup = (props) => {
  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [profilePhoto, setProfilePhoto] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getCategoriesData = async () => {
    const { data } = await getCategories();
    var categories = [...data];
    var categoriesArray = [];
    categories.forEach((category) => {
      categoriesArray.push(category.categoryName);
    });
    setCategories(categoriesArray);
  };

  React.useEffect(() => {
    getCategoriesData();
  }, []);

  const handleBusinessRegister = async (e) => {
    e.preventDefault();
    console.log(selectedCategories);
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("userName", userName);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("phoneNumber", phoneNumber);
    data.append("profilePhoto", profilePhoto);
    data.append("categories", selectedCategories);
    axios({
      method: "post",
      url: "http://localhost:4000/api/users/register/business/",
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
          background: 'url("https://via.placeholder.com/1920x800")',
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="pt-caption text-center">
              <h1>Create Business Account</h1>
              <p>
                <a href="index.html">Home</a>
                <span className="current-page">Register Business</span>
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
                      <label>User Name</label>
                      <div className="input-with-gray">
                        <input
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Username"
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
                          id="profile"
                          onChange={(event) => {
                            const img = event.target.files[0];
                            setProfilePhoto(img);
                          }}
                        />
                        <label className="custom-file-label" htmlFor="profile">
                          Choose file
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      {categories.length === 0 ? (
                        ""
                      ) : (
                        <DropdownMultiselect
                          options={categories}
                          name="categories"
                          placeholder="Categories"
                          handleOnChange={(selected) => {
                            console.log(selected);
                            setSelectedCategories(selected);
                          }}
                        />
                      )}
                    </div>

                    <div className="form-group">
                      <button
                        onClick={handleBusinessRegister}
                        type="submit"
                        className="btn btn-primary btn-md full-width pop-login"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
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

export default BusinessSignup;

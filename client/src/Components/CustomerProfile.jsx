import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import CustomerSidebar from "./Common/CustomerSidebar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getloggedinuser, getUser } from "../Services/usersService";
import axios from "axios";
import { getBusiness } from "../Services/businessesService";
import Notification from "./Admin/Common/Notification";

const CustomerProfile = (props) => {
  const [id, setId] = React.useState("");
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [profile, setProfile] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getUserDetails = async () => {
    const user = getloggedinuser();
    if (user) {
      setUserId(user._id);
      setFullName(user.name);
      setUser(user);
    }
    const { data } = await getUser(user._id);
    if (data) {
      setId(data._id);
      setFullName(data.fullName);
      setPhoneNumber(data.phoneNumber);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (id != "") {
      console.log("Ok");
    }
    data.append("fullName", fullName);
    data.append("phoneNumber", phoneNumber);
    data.append("profile", profile);
    console.log("In submit");
    axios({
      method: "put",
      url: `http://localhost:4000/api/users/update/${id}`,
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
                <div className="tab-pane active container" id="c-profile">
                  <div className="tr-single-box">
                    <div className="tr-single-header">
                      <h4>
                        <i className="ti-home"></i> Personal Information
                      </h4>
                    </div>

                    <div className="tr-single-body">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              className="form-control"
                              type="text"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Profile Picture</label>
                            <div className="custom-file">
                              <input
                                accept="image/*"
                                type="file"
                                className="custom-file-input"
                                id="logo"
                                onChange={(event) => {
                                  const profile = event.target.files[0];
                                  setProfile(profile);
                                }}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="profile"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Phone Number</label>
                            <input
                              className="form-control"
                              type="text"
                              value={phoneNumber}
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="btn btn-info btn-md full-width"
                  >
                    Save & Update<i className="ml-2 ti-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Notification notify={notify} setNotify={setNotify}></Notification>
      <Newsletter />
      <Footer />
    </>
  );
};

export default CustomerProfile;

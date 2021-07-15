import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { getCategories } from "../Services/categoriesService";
import axios from "axios";
import { getloggedinuser } from "../Services/usersService";
import CustomerSidebar from "./Common/CustomerSidebar";
import Notification from "./Admin/Common/Notification";

const PostRequest = (props) => {
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [projectDate, setProjectDate] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [minBudget, setMinBudget] = React.useState("");
  const [maxBudget, setMaxBudget] = React.useState("");
  const [referenceImage, setReferenceImage] = React.useState("");

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getCategoriesData = async () => {
    const { data } = await getCategories();
    const categories = [...data];
    setCategories(categories);
  };
  const getUserDetails = () => {
    const user = getloggedinuser();
    if (user) {
      setUserId(user._id);
      setFullName(user.name);
      setUser(user);
    }
  };

  React.useEffect(() => {
    getCategoriesData();
    getUserDetails();
  }, []);

  const handleSubmit = () => {
    const data = new FormData();
    data.append("userId", userId);
    data.append("title", title);
    data.append("category", category);
    data.append("projectDate", projectDate);
    data.append("detail", detail);
    data.append("minBudget", minBudget);
    data.append("maxBudget", maxBudget);
    data.append("referenceImage", referenceImage);
    axios({
      method: "post",
      url: "http://localhost:4000/api/requests/",
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
                        <i className="ti-home"></i> Request Details
                      </h4>
                    </div>

                    <div className="tr-single-body">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Request Title</label>
                            <input
                              className="form-control"
                              type="text"
                              value={title}
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Category</label>
                            <select
                              id="business-type"
                              className="js-states form-control"
                              value={category}
                              onChange={(e) => {
                                setCategory(e.target.value);
                              }}
                            >
                              <option value="">Please Select</option>
                              {categories.map((category) => (
                                <option value={category.categoryName}>
                                  {category.categoryName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Date</label>
                            <input
                              className="form-control"
                              type="date"
                              value={projectDate}
                              onChange={(e) => {
                                setProjectDate(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Details</label>
                            <textarea
                              className="form-control"
                              placeholder="Type Here..."
                              onChange={(e) => {
                                setDetail(e.target.value);
                              }}
                              value={detail}
                            >
                              {detail}
                            </textarea>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Min Budget</label>
                            <input
                              className="form-control"
                              type="number"
                              value={minBudget}
                              onChange={(e) => {
                                setMinBudget(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Max Budget</label>
                            <input
                              className="form-control"
                              type="number"
                              value={maxBudget}
                              onChange={(e) => {
                                setMaxBudget(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Reference Image</label>
                            <div className="custom-file">
                              <input
                                accept="image/*"
                                type="file"
                                className="custom-file-input"
                                id="logo"
                                onChange={(event) => {
                                  const image = event.target.files[0];
                                  setReferenceImage(image);
                                }}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="logo"
                              >
                                Choose file
                              </label>
                            </div>
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
      <Footer />
    </>
  );
};

export default PostRequest;

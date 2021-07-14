import React from "react";
import Header from "../Common/Header";
import Newsletter from "../Common/Newsletter";
import Footer from "../Common/Footer";
import BusinessSidebar from "./Common/BusinessSidebar";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import { getloggedinuser } from "../../Services/usersService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { getBusiness } from "../../Services/businessesService";
import Notification from "./../Admin/Common/Notification";

const CreateProfile = (props) => {
  const [id, setId] = React.useState("");
  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [slogan, setSlogan] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [logo, setLogo] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [facebookUrl, setFacebookUrl] = React.useState("");
  const [googleUrl, setGoogleUrl] = React.useState("");
  const [linkedInUrl, setLinkedInUrl] = React.useState("");
  const [twitterUrl, setTwitterUrl] = React.useState("");
  const [instagramUrl, setInstagramUrl] = React.useState("");
  const [pinterestUrl, setPinterestUrl] = React.useState("");
  const [since, setSince] = React.useState("");
  const [teamSize, setTeamSize] = React.useState("");
  const [branches, setBranches] = React.useState("");
  const [businessType, setBusinessType] = React.useState("");

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
    const { data } = await getBusiness(user._id);
    if (data) {
      setId(data._id);
      setCompanyName(data.companyName);
      setSlogan(data.slogan);
      setAbout(data.about);
      setLogo(data.logo);
      setCoverImage(data.coverImage);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setWebsite(data.website);
      setCountry(data.country);
      setCity(data.city);
      setAddress(data.address);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setFacebookUrl(data.facebookUrl);
      setGoogleUrl(data.googleUrl);
      setLinkedInUrl(data.linkedInUrl);
      setTwitterUrl(data.twitterUrl);
      setInstagramUrl(data.instagramUrl);
      setPinterestUrl(data.pinterestUrl);
      setSince(data.since);
      setTeamSize(data.teamSize);
      setBranches(data.branches);
      setBusinessType(data.businessType);
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
    data.append("userId", userId);
    data.append("companyName", companyName);
    data.append("slogan", slogan);
    data.append("about", about);
    data.append("logo", logo);
    data.append("coverImage", coverImage);
    data.append("phoneNumber", phoneNumber);
    data.append("email", email);
    data.append("website", website);
    data.append("country", country);
    data.append("city", city);
    data.append("address", address);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("facebookUrl", facebookUrl);
    data.append("googleUrl", googleUrl);
    data.append("linkedInUrl", linkedInUrl);
    data.append("twitterUrl", twitterUrl);
    data.append("instagramUrl", instagramUrl);
    data.append("pinterestUrl", pinterestUrl);
    data.append("since", since);
    data.append("teamSize", teamSize);
    data.append("branches", branches);
    data.append("businessType", businessType);
    if (id === "") {
      axios({
        method: "post",
        url: "http://localhost:4000/api/business/",
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
    } else {
      axios({
        method: "put",
        url: `http://localhost:4000/api/business/update/${id}`,
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
    }
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
            <BusinessSidebar fullName={fullName} image={user.profilePhoto} />
            <div className="col-md-8 col-sm-12">
              <div className="tab-content">
                <div className="tab-pane active container" id="c-profile">
                  <div className="tr-single-box">
                    <div className="tr-single-header">
                      <h4>
                        <i className="ti-home"></i> Company Information
                      </h4>
                    </div>

                    <div className="tr-single-body">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              className="form-control"
                              type="text"
                              value={companyName}
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Company Slogan</label>
                            <input
                              className="form-control"
                              type="text"
                              value={slogan}
                              onChange={(e) => {
                                setSlogan(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>About</label>
                            <textarea
                              value={about}
                              onChange={(e) => {
                                setAbout(e.target.value);
                              }}
                              className="form-control"
                              placeholder="About Your Business"
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Business Logo</label>
                            <div className="custom-file">
                              <input
                                accept="image/*"
                                type="file"
                                className="custom-file-input"
                                id="logo"
                                onChange={(event) => {
                                  const logo = event.target.files[0];
                                  setLogo(logo);
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
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Cover Picture</label>
                            <div className="custom-file">
                              <input
                                accept="image/*"
                                type="file"
                                className="custom-file-input"
                                id="coverImage"
                                onChange={(event) => {
                                  const coverImage = event.target.files[0];
                                  setCoverImage(coverImage);
                                }}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="coverImage"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tr-single-box">
                    <div className="tr-single-header">
                      <h4>
                        <i className="ti-headphone"></i> Contact Info
                      </h4>
                    </div>

                    <div className="tr-single-body">
                      <div className="row">
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

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Email</label>
                            <input
                              className="form-control"
                              type="text"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Website</label>
                            <input
                              className="form-control"
                              type="text"
                              value={website}
                              onChange={(e) => {
                                setWebsite(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Country</label>
                            <input
                              className="form-control"
                              type="text"
                              value={country}
                              onChange={(e) => {
                                setCountry(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">City</label>
                            <input
                              className="form-control"
                              type="text"
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">
                              Complete Address
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Latitude</label>
                            <input
                              className="form-control"
                              type="text"
                              value={latitude}
                              onChange={(e) => {
                                setLatitude(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Longitude</label>
                            <input
                              className="form-control"
                              type="text"
                              value={longitude}
                              onChange={(e) => {
                                setLongitude(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tr-single-box">
                    <div className="tr-single-header">
                      <h4>
                        <i className="ti-new-window"></i> Social Account
                      </h4>
                    </div>

                    <div className="tr-single-body">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">
                              <i className="lni-facebook"></i>Facebook URL
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={facebookUrl}
                              onChange={(e) => {
                                setFacebookUrl(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">
                              <i className="lni-google-plus"></i>Google+ URL
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={googleUrl}
                              onChange={(e) => {
                                setGoogleUrl(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">
                              <i className="lni-linkedin"></i>LinkedIn URL
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={linkedInUrl}
                              onChange={(e) => {
                                setLinkedInUrl(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">
                              <i className="lni-twitter"></i>Twitter URL
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={twitterUrl}
                              onChange={(e) => {
                                setTwitterUrl(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">
                              <i className="lni-instagram"></i>Instagram URL
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={instagramUrl}
                              onChange={(e) => {
                                setInstagramUrl(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">
                              <i className="lni-pinterest"></i>Pinterest URL
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={pinterestUrl}
                              onChange={(e) => {
                                setPinterestUrl(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tr-single-box">
                    <div className="tr-single-header">
                      <h4>
                        <i className="ti-heart"></i> Advance Information
                      </h4>
                    </div>

                    <div className="tr-single-body">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Est. Since</label>
                            <input
                              className="form-control"
                              type="text"
                              value={since}
                              onChange={(e) => {
                                setSince(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Team Size</label>
                            <input
                              className="form-control"
                              type="text"
                              value={teamSize}
                              onChange={(e) => {
                                setTeamSize(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Branches</label>
                            <input
                              className="form-control"
                              type="text"
                              value={branches}
                              onChange={(e) => {
                                setBranches(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="social-nfo">Business Type</label>
                            <select
                              id="business-type"
                              className="js-states form-control"
                              value={businessType}
                              onChange={(e) => {
                                setBusinessType(e.target.value);
                              }}
                            >
                              <option value="">Please Select</option>
                              <option value="Limited Company" selected>
                                Limited Company
                              </option>
                              <option value="Private Limited">
                                Private Limited
                              </option>
                              <option value="C Corporations">
                                C Corporations
                              </option>
                              <option value="S Corporations">
                                S Corporations
                              </option>
                            </select>
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

export default CreateProfile;

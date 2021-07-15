import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import { addContact } from "../Services/contactsService";
import { Link } from "react-router-dom";

const AboutUs = (props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addContact({
      name,
      email,
      subject,
      message,
    }).then(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    });
  };
  return (
    <>
      <Header />
      <div className="clearfix"></div>
      <div
        className="page-title-wrap pt-img-wrap"
        style={{
          background:
            "url('https://source.unsplash.com/random?contact/1920x800')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="pt-caption text-center">
              <h1>About Us</h1>
              <p>
                <Link to="/">Home</Link>
                <span className="current-page">About Us</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <section className="gray">
        <div className="container">
          <div className="row">
            <div className="contact-address">
              <div className="add-box">
                <div className="add-icon-box"></div>
                <div className="add-text-box">
                  <h4>The Project</h4>
                  Dibuzz is an online platorm that provides small businesses
                  with minimal to no online presence., a space where the can
                  offer their services to a vast community of customers. The
                  idea of Dibuzz was originated when we had to order a
                  customized cake but couldn't find a local business who could
                  cater to our requirements.
                  <br />
                </div>
              </div>

              <div className="add-box">
                <div className="add-icon-box">
                  <i className="ti-map-alt theme-cl"></i>
                </div>
                <div className="add-text-box">
                  <h4>Head Offices</h4>
                  241, Jasmine Block, Bahria Town
                  <br />
                  Lahore, Pakistan
                </div>
              </div>

              <div className="add-box">
                <div className="add-icon-box">
                  <i className="ti-email theme-cl"></i>
                </div>
                <div className="add-text-box">
                  <h4>Emails</h4>
                  saadkhan1405@gmail.com
                  <br />
                  malikmahroze100@outlook.com
                  <br />
                </div>
              </div>
              <div className="add-box">
                <div className="add-icon-box">
                  <i className="ti-headphone theme-cl"></i>
                </div>
                <div className="add-text-box">
                  <h4>Calls</h4>
                  +92 320 4747459
                  <br />
                  +92 304 3838071
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>
      <Footer />
    </>
  );
};

export default AboutUs;

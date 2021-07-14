import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import { addContact } from "../Services/contactsService";

const ContactUs = (props) => {
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
              <h1>Get in Touch</h1>
              <p>
                <a href="index.html">Home</a>
                <span className="current-page">Contact Us</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <section className="gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5 bg-white">
              <div className="contact-address">
                <div className="add-box">
                  <div className="add-icon-box">
                    <i className="ti-home theme-cl"></i>
                  </div>
                  <div className="add-text-box">
                    <h4>Workio Limited</h4>
                    CEO: Sagar Singh
                    <br />
                    CFO: Shaurya Singh
                    <br />
                  </div>
                </div>

                <div className="add-box">
                  <div className="add-icon-box">
                    <i className="ti-map-alt theme-cl"></i>
                  </div>
                  <div className="add-text-box">
                    <h4>Head Offices</h4>
                    810 Clis Road,
                    <br />
                    Indraprash NW11 0PU, India
                  </div>
                </div>

                <div className="add-box">
                  <div className="add-icon-box">
                    <i className="ti-email theme-cl"></i>
                  </div>
                  <div className="add-text-box">
                    <h4>Emails</h4>
                    Workio@gmail.com
                    <br />
                    my.Workio@gmail.com
                    <br />
                  </div>
                </div>
                <div className="add-box">
                  <div className="add-icon-box">
                    <i className="ti-headphone theme-cl"></i>
                  </div>
                  <div className="add-text-box">
                    <h4>Calls</h4>
                    91+ 123 456 9857
                    <br />
                    91+ 258 548 5426
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="contact-form">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      placeholder="Type Here..."
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      value={message}
                    >
                      {message}
                    </textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ContactUs;

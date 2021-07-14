import React from "react";

const Newsletter = () => {
  return (
    <section
      className="alert-wrap pt-5 pb-5"
      style={{
        backgroundColor: "#1cadcb",
        // background: 'url("theme/assets/img/bg2.png")',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="jobalert-sec">
              <h3 className="mb-1 text-light">Get New Jobs Notification!</h3>
              <p className="text-light">
                Subscribe & get all related jobs notification.
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Email"
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-black black">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

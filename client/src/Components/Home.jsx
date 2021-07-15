import React from "react";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Newsletter from "./Common/Newsletter";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getCategories } from "../Services/categoriesService";
import { Link } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const getCategoriesData = async () => {
    const { data } = await getCategories();
    const categories = [...data];
    setCategories(categories);
  };

  React.useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <>
      {/* <div className="Loader"></div> */}
      <div id="main-wrapper">
        <Header />
        <div
          className="hero-header jumbo-banner text-center"
          style={{ background: 'url("assets/images/home-bg.jpeg")' }}
        >
          <div className="container">
            <h1 className="text-white">A Small Business Bazar</h1>
            <form className="search-big-form no-border search-shadow">
              <div className="row m-0">
                <div className="col-lg-5 col-md-5 col-sm-12 p-0">
                  <div className="form-group">
                    <i className="ti-search"></i>
                    <input
                      type="text"
                      className="form-control b-r"
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                  <div className="form-group">
                    <select
                      id="category"
                      className="js-states form-control"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                      }}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option
                          key={category._id}
                          value={category.categoryName}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    <i className="ti-layers"></i>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                  <Link
                    to={{
                      pathname: "/businessSearch",
                      state: { category: selectedCategory },
                    }}
                    className="btn btn-primary full-width py-4"
                  >
                    Find Business
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="sec-heading mx-auto">
                  <p>Search By Category</p>
                  <h2>Popular Jobs Category</h2>
                </div>
              </div>
            </div>

            <div className="row">
              {categories.map((category) => (
                <div key={category._id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="small-category-2">
                    <div className="small-category-2-thumb themes-light text-center">
                      <Link
                        to={{
                          pathname: "/businessSearch",
                          state: { category: category.categoryName },
                        }}
                      >
                        <img
                          width="75%"
                          src={
                            "http://localhost:4000/api/categories/icon/" +
                            category.categoryIcon
                          }
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="sc-2-detail">
                      <h5 className="sc-jb-title">
                        <Link
                          to={{
                            pathname: "/businessSearch",
                            state: { category: category.categoryName },
                          }}
                        >
                          {category.categoryName}
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row mt-4">
              <div className="col-lg-12 col-md-12">
                <div className="text-center">
                  <Link to="/categoriesSearch" className="btn btn-primary">
                    Browse All Category<i className="ti-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section
          className="image-bg image-light text-center"
          style={{ background: 'url("https://via.placeholder.com/1920x800")' }}
          data-overlay="7"
        >
          <div className="container">
            <div className="row justify-content-center mb-4">
              <div className="col text-center">
                <div className="sec-heading light mx-auto">
                  <p>How We Work?</p>
                  <h2>Our Working Process</h2>
                </div>
              </div>
            </div>

            <div className="row m-0">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="video-block">
                  <div className="video-play-icon modal-trigger">
                    <a href="#" data-toggle="modal" data-target="#popup-video">
                      <i className="fa fa-play theme-cl" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <section
          className="image-bg text-center"
          style={{
            background: "#1cadcb",
            backgroundImage: 'url("theme/assets/img/bg2.png")',
          }}
          data-overlay="0"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 b-r">
                <div className="count-facts">
                  <h4>2120</h4>
                  <span>Jobs Posted</span>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 b-r">
                <div className="count-facts">
                  <h4>3117</h4>
                  <span>Jobs Filled</span>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 b-r">
                <div className="count-facts">
                  <h4>872</h4>
                  <span>Companies</span>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="count-facts">
                  <h4>3740</h4>
                  <span>Freelancer</span>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="gray">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="sec-heading mx-auto">
                  <p>Our Client Review</p>
                  <h2>What people are saying?</h2>
                </div>
              </div>
            </div>

            {/* <div className="row"> */}
            <Carousel responsive={responsive}>
              <div style={{ width: "90%" }}>
                <div className="testimonial-wrap style-2">
                  <div className="client-thumb-box">
                    <div className="client-thumb-content">
                      <div className="client-thumb">
                        <img
                          src="https://via.placeholder.com/400x400"
                          className="img-responsive img-circle"
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0">Muhammad Naqvi</h5>
                      <span>Volioche</span>
                      <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </div>
                    </div>
                  </div>

                  <p>
                    Dibuzz is a great initiative. It made it easy for me to find
                    services
                  </p>
                </div>
              </div>

              <div style={{ width: "90%" }}>
                <div className="testimonial-wrap style-2">
                  <div className="client-thumb-box">
                    <div className="client-thumb-content">
                      <div className="client-thumb">
                        <img
                          src="https://via.placeholder.com/400x400"
                          className="img-responsive img-circle"
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0">Muhammad Saad</h5>
                      <span>DivSet studios</span>
                      <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </div>
                    </div>
                  </div>

                  <p>Helped me find a guy for home repair, Thank you Dibuzz</p>
                </div>
              </div>

              <div style={{ width: "90%" }}>
                <div className="testimonial-wrap style-2">
                  <div className="client-thumb-box">
                    <div className="client-thumb-content">
                      <div className="client-thumb">
                        <img
                          src="https://via.placeholder.com/400x400"
                          className="img-responsive img-circle"
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0">Abdul Raffay</h5>
                      <span></span>
                      <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </div>
                    </div>
                  </div>

                  <p>
                    "I really liked using this site. Just had to post a request
                    and people came to me on my terms. Highly recommended."
                  </p>
                </div>
              </div>

              <div style={{ width: "90%" }}>
                <div className="testimonial-wrap style-2">
                  <div className="client-thumb-box">
                    <div className="client-thumb-content">
                      <div className="client-thumb">
                        <img
                          src="https://via.placeholder.com/400x400"
                          className="img-responsive img-circle"
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0">Javeria Tariq</h5>
                      <span>Graphic designer</span>
                      <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </div>
                    </div>
                  </div>

                  <p>
                    Great Initiative. Helped me find a photographer for my new
                    designs. Really glad this exists.
                  </p>
                </div>
              </div>
            </Carousel>
            {/* </div> */}
          </div>
        </section>
        <div className="clearfix"></div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

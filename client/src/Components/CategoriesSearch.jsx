import React from "react";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import { getCategories } from "../Services/categoriesService";
import { Link } from "react-router-dom";

const CategoriesSearch = (props) => {
  const [categories, setCategories] = React.useState([]);

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
      <Header />
      <div className="clearfix"></div>
      <div
        className="page-title-wrap pt-img-wrap"
        style={{
          background: "url('https://source.unsplash.com/random/1920x800')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="pt-caption text-center">
              <h1>Explore Categories</h1>
              <p>
                <Link to="/">Home</Link>
                <span className="current-page">Categories</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {categories.map((category) => (
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="employer-wrap small">
                      <div
                        className="employer-cover-image"
                        style={{
                          backgroundImage: `url('https://source.unsplash.com/random?${category.categoryName}/1280x820')`,
                        }}
                      >
                        <div className="employer-thumb">
                          <Link
                            to={{
                              pathname: "/businessSearch",
                              state: { category: category.categoryName },
                            }}
                          >
                            <img
                              alt=""
                              src={
                                "http://localhost:4000/api/categories/icon/" +
                                category.categoryIcon
                              }
                              className="avatar avatar-120 photo"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="employer-detail">
                        <div className="employer-detail-inner">
                          <h4 className="employer-title">
                            <Link
                              className="theme-cl"
                              to={{
                                pathname: "/businessSearch",
                                state: { category: category.categoryName },
                              }}
                            >
                              {category.categoryName}
                            </Link>
                          </h4>
                          <Link
                            className="total-vacancy text-success"
                            to={{
                              pathname: "/businessSearch",
                              state: { category: category.categoryName },
                            }}
                          >
                            View all Businesses
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CategoriesSearch;

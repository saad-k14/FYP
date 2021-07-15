import React from "react";
import { Link } from "react-router-dom";
import { insideCircle } from "geolocation-utils";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";
import _ from "lodash";
import { getBusinesses } from "../Services/businessesService";
import { getCategories } from "../Services/categoriesService";
import Header from "./Common/Header";

function Map(props) {
  const [selectedBusiness, setSelectedBusiness] = React.useState(null);
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={props.currentLocation}
      zoomControl={true}
      onClick={(event) => {
        console.log(event);
      }}
    >
      {props.businesses.map((business, index) => (
        <Marker
          key={index}
          position={{
            lat: parseFloat(business.latitude),
            lng: parseFloat(business.longitude),
          }}
          onClick={() => {
            setSelectedBusiness(business);
          }}
        />
      ))}
      {selectedBusiness && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedBusiness.latitude),
            lng: parseFloat(selectedBusiness.longitude),
          }}
          onCloseClick={() => {
            setSelectedBusiness(null);
          }}
        >
          <div>
            <h3>{selectedBusiness.companyName}</h3>
            <p>{selectedBusiness.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const BusinessSearch = (props) => {
  const [currentLocation, setCurrentLocation] = React.useState({});
  const [businesses, setBusinesses] = React.useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items;
    },
  });

  const getBusinessesData = async () => {
    const { data } = await getBusinesses();
    const businesses = [...data];
    console.log(businesses);
    setBusinesses(businesses);
    var filtered = [];
    const { category } = props.location.state || "";
    if (!category) {
      for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i];
        if (
          insideCircle(
            {
              lat: parseFloat(currentLocation.lat),
              lng: parseFloat(currentLocation.lng),
            },
            {
              lat: parseFloat(business.latitude),
              lon: parseFloat(business.longitude),
            },
            1000000
          )
        ) {
          filtered.push(business);
        }
      }
    } else {
      for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i];
        if (business.categories.includes(category)) {
          if (
            insideCircle(
              currentLocation,
              {
                lat: parseFloat(business.latitude),
                lon: parseFloat(business.longitude),
              },
              100000
            )
          ) {
            filtered.push(business);
          }
        }
      }
    }
    setFilteredBusinesses(filtered);
  };
  const getCategoriesData = async () => {
    const { data } = await getCategories();
    const categories = [...data];
    setCategories(categories);
  };
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null,
      { enableHighAccuracy: true, timeout: 1000 }
    );
  };
  React.useEffect(() => {
    getCurrentLocation();
    // getBusinessesData();
    getCategoriesData();
  }, []);
  React.useEffect(() => {
    console.log(currentLocation);
    if (!_.isEmpty(currentLocation)) {
      getBusinessesData();
    }
  }, [currentLocation]);

  const handleFilter = () => {
    var filtered = [];
    const category = selectedCategory;
    if (category == "") {
      for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i];
        if (
          insideCircle(
            currentLocation,
            {
              lat: parseFloat(business.latitude),
              lon: parseFloat(business.longitude),
            },
            100000
          )
        ) {
          filtered.push(business);
        }
      }
    } else {
      for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i];
        if (business.categories.includes(selectedCategory)) {
          if (
            insideCircle(
              currentLocation,
              {
                lat: parseFloat(business.latitude),
                lon: parseFloat(business.longitude),
              },
              100000
            )
          ) {
            filtered.push(business);
          }
        }
      }
    }
    setFilteredBusinesses(filtered);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else {
          return items.filter((x) =>
            x.companyName.toLowerCase().includes(target.value.toLowerCase())
          );
        }
      },
    });
  };

  return (
    <>
      <Header />
      <div className="fs-container half-map">
        <div className="fs-inner-container">
          <div className="fs-content">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-6">
                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="ti-search"></i>
                    <input
                      type="text"
                      className="form-control b-r"
                      placeholder="Username"
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-4">
                <div className="form-group">
                  <div className="input-with-icon">
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                      }}
                      id="category"
                      className="js-states form-control"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category, i) => (
                        <option value={category.categoryName} key={i}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    <i className="ti-layers"></i>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-2 col-sm-2">
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn full-width ft-search btn-primary"
                    onClick={handleFilter}
                  >
                    <i className="ti-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="flt-result mb-3">
                  <div className="flt-result-num">
                    <h4>
                      {filterFn.fn(filteredBusinesses).length} Result found
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {filterFn.fn(filteredBusinesses).map((business, i) => (
                <div className="col-md-6 col-sm-12" key={i}>
                  <div className="classic-joblist ultimate">
                    <div className="cl-job-employer">
                      <div className="cljb-emp-thumg">
                        <Link
                          to={{
                            pathname: "/businessDetail",
                            state: { business: business },
                          }}
                        >
                          <img
                            src={
                              "http://localhost:4000/api/business/logo/" +
                              business.companyName +
                              "/" +
                              business.logo
                            }
                            width="100%"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="cljb-emp-detail">
                        <h5>
                          <Link
                            to={{
                              pathname: "/businessDetail",
                              state: { business: business },
                            }}
                          >
                            {business.companyName}
                          </Link>
                        </h5>
                      </div>
                    </div>

                    <h4 className="job-title">
                      <Link
                        to={{
                          pathname: "/businessDetail",
                          state: { business: business },
                        }}
                      >
                        {business.slogan}
                      </Link>
                    </h4>

                    <div className="cl-job-intro">
                      <span className="cl-jb-loaction">
                        <i className="ti-location-pin"></i>
                        {business.city}, {business.country}
                      </span>
                      <span className="cl-jb-type full-time">
                        Since {business.since}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fs-left-map-box">
          <div className="home-map fl-wrap">
            <div className="map-container fw-map">
              <div id="map-main">
                <WrappedMap
                  businesses={filteredBusinesses}
                  currentLocation={currentLocation}
                  googleMapURL={`https://www.google.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC0WT3TOmUavrjyhggxrVcE5g2r7Q8j9uQ`}
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: "100%" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessSearch;

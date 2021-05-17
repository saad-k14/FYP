import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";

class BusinessService extends GenericService {
  constructor() {
    super();
  }

  //login
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("b_user/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });

  //register
  register = (name, email, password, username, categories, phone, details) =>
    this.post("b_user/register", {
      password,
      email,
      name,
      username,
      categories,
      phone,
      details,
    });
  logout = () => {
    localStorage.removeItem("token");
  };
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
  /*isAdmin = () => {
  if (this.isLoggedIn()) {
    if (this.getLoggedInUser().role == "admin") return true;
    else return false;
  } else return false;
};*/
}

let BusinessServices = new BusinessService();
export default BusinessServices;

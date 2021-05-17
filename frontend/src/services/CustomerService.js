import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";

class CustomerService extends GenericService {
  constructor() {
    super();
  }

  //login
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("c_user/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });

  //register
  register = (name, email, password, phone) =>
    this.post("c_user/register", {
      password,
      email,
      name,
      phone,
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

let CustomerServices = new CustomerService();
export default CustomerServices;

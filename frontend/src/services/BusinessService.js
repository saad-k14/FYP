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
  /*isLoggedIn = () =>
    new Promise((resolve, reject) => {
      this.post("b_user/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });*/
  isLoggedIn = () => {
    try {
      const jwt = localStorage.getItem("token");
      if (!jwt) return false;
      const user = jwtDecode(jwt);
      if (user.role == 0) {
        return true;
      } else {
        return false;
      }
    } catch (ex) {
      console.log(ex);
    }

    const jwt = localStorage.getItem("token");
    if (!jwt) return false;
    return true;
  };
  getLoggedInUser = () => {
    // return { name: "ss" };
    try {
      if (!this.isLoggedIn()) return null;
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };

  //idk if this will work
  getB_UsersBycategory = (_id) => this.get("b_user/category/" + _id);
  getB_UsersByUsername = (username) => this.get("b_user/username/" + username);

  /*isAdmin = () => {
  if (this.isLoggedIn()) {
    if (this.getLoggedInUser().role == "admin") return true;
    else return false;
  } else return false;
};*/
}

let BusinessServices = new BusinessService();
export default BusinessServices;

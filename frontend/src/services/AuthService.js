import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";

class AuthService extends GenericService {
  constructor() {
    super();
  }

  logout = () => {
    localStorage.removeItem("token");
  };
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
}

let AuthServices = new AuthService();
export default AuthServices;

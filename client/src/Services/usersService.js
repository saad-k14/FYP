import http from "./httpService";
import { apiURL } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiURL + "/users";

export function businessSignup(user) {
  return http.post(apiEndPoint + "/register/business", user);
}

export function userSignup(user) {
  return http.post(apiEndPoint + "/register/user", user);
}

export function userLogin(data) {
  return new Promise((resolve, reject) => {
    http
      .post(apiEndPoint + "/login", data)
      .then((res) => {
        resolve(res.data.token);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function isLoggedin() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

export async function changePassword(data) {
  let user = await getloggedinuser();
  const userId = user._id;
  return http.put(apiEndPoint + "/changePassword/" + userId, data);
}

export async function forgotPassword(data) {
  return http.post(apiEndPoint + "/forgotPassword/", data.values);
}

export function getloggedinuser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

export function logout() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    return true;
  } else {
    return false;
  }
}

export function getUser(userId) {
  return http.get(apiEndPoint + "/" + userId);
}

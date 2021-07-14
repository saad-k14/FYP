import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndPoint = apiURL + "/contacts";

export function getContacts() {
  return http.get(apiEndPoint);
}

export function addContact(contact_input) {
  return http.post(apiEndPoint, contact_input);
}

import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndPoint = apiURL + "/chats";

export function getContacts(userId) {
  return http.get(apiEndPoint + "/contacts/" + userId);
}

export function getMessages(room) {
  return http.get(apiEndPoint + "/messages/" + room);
}

import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndPoint = apiURL + "/requests";

export function getAllRequests() {
  return http.get(apiEndPoint);
}

export function getRequests(userId) {
  return http.get(apiEndPoint + "/" + userId);
}

export function getBusinessRequests(userId) {
  return http.get(apiEndPoint + "/business/" + userId);
}

export function getBusinessUsersWhoAccepted(requestId) {
  return http.get(apiEndPoint + "/acceptedBy/" + requestId);
}

export function discardRequest(id) {
  return http.put(apiEndPoint + "/discard/" + id);
}

export function ignoreRequest(id, businessUserId) {
  return http.put(apiEndPoint + "/ignore/" + id, { businessUserId });
}

export function acceptRequest(id, response) {
  return http.put(apiEndPoint + "/accept/" + id, { response });
}

export function approveRequest(id) {
  return http.put(apiEndPoint + "/approve/" + id);
}

export function deleteRequest(requestId) {
  return http.delete(apiEndPoint + "/" + requestId);
}

import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndPoint = apiURL + "/business";

export function getBusinesses() {
  return http.get(apiEndPoint);
}

export function getBusiness(userId) {
  return http.get(apiEndPoint + "/user/" + userId);
}

export function getRatings(businessId) {
  console.log("getRatings");
  return http.get(apiEndPoint + "/ratings/" + businessId);
}

export function addRating(businessId, rating) {
  return http.put(apiEndPoint + "/rating/" + businessId, { rating });
}

// export function addCategory(category_input) {
//   return http.post(apiEndPoint, category_input);
// }

// export function updateCategory(categoryId, category_input) {
//   return http.put(apiEndPoint + "/" + categoryId, category_input);
// }

// export function deleteCategory(categoryId) {
//   return http.delete(apiEndPoint + "/" + categoryId);
// }

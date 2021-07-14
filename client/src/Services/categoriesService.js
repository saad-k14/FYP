import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndPoint = apiURL + "/categories";

export function getCategories() {
  return http.get(apiEndPoint);
}

export function addCategory(category_input) {
  return http.post(apiEndPoint, category_input);
}

export function updateCategory(categoryId, category_input) {
  return http.put(apiEndPoint + "/" + categoryId, category_input);
}

export function deleteCategory(categoryId) {
  return http.delete(apiEndPoint + "/" + categoryId);
}

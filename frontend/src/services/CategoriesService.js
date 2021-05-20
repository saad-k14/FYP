import GenericService from "./GenericService";
class CategoriesService extends GenericService {
  constructor() {
    super();
  }
  addCategory = (data) => this.post("category/post", data);
  deleteCategory = (_id) => this.delete("category/" + _id);
  updateCategory = (_id, data) => this.put("category/" + _id, data);
  getCategories = () => this.get("category/");
  getSingleCategory = (id) => this.get("category/" + id);
}

let categoryServices = new CategoriesService();
export default categoryServices;

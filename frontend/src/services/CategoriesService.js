import GenericService from "./GenericService";
class CategoriesService extends GenericService {
  constructor() {
    super();
  }
  addBlog = (data) => this.post("category/post", data);
  deleteBlog = (_id) => this.delete("category/" + _id);
  updateBlog = (_id, data) => this.put("category/" + _id, data);
  getBlogs = () => this.get("category");
  getSingleBlog = (id) => this.get("category/" + id);

  //idk if this will work
  getB_Users = (_id) => this.get("b_user/category/" + _id);
}

let categoryServices = new CategoriesService();
export default categoryServices;

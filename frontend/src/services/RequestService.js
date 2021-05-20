import GenericService from "./GenericService";
class RequestService extends GenericService {
  constructor() {
    super();
  }
  addRequest = (data) => this.post("request/post", data);
  deleteRequest = (_id) => this.delete("request/" + _id);
  updateRequest = (_id, data) => this.put("request/" + _id, data);
  getRequests = () => this.get("request");
  getSingleRequest = (_id) => this.get("request/" + _id);

  getSingleUserRequests = (id) => this.get("request/myrequests/" + id);
  getBusinessUserRequests = () => this.get("b_user/myrequests/");
  getCustomerUserRequests = () => this.get("c_user/myrequests/");
}

let requestServices = new RequestService();
export default requestServices;

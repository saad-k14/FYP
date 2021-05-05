import GenericService from "./GenericService";

class BusinessService extends GenericService {
  constructor() {
    super();
  }
  getBusinessUser = (userName) => this.get("b_users/" + userName);
}

let BsinessService = new BusinessService();
export default BsinessService;

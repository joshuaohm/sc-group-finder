import Repository from "./Repository";

var resource = "/login";
export default {

  login(payload){
    return Repository.post(`${resource}`, payload);
  },

  register(payload){
    resource = "/register";
    return Repository.post(`${resource}`, payload);
  }

}

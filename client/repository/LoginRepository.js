import Repository from "./Repository";


export default {

  login(payload, errorCallBack){
    var resource = "/login";

    if(errorCallBack){
      return Repository.post(`${resource}`, payload)
      .catch(errorCallBack());
    }

    return Repository.post(`${resource}`, payload);
  },

  register(payload, errorCallBack){
    var resource = "/register";

    if(errorCallBack){
      return Repository.post(`${resource}`, payload)
      .catch(errorCallBack());
    }

    return Repository.post(`${resource}`, payload);
  },

  logOut(errorCallBack){
    var resource = "/logout";
    if(errorCallBack){
      return Repository.post(`${resource}`)
      .catch(errorCallBack());
    }

    return Repository.post(`${resource}`);
  }

}

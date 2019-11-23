import Repository from "./Repository";


export default {

  login(payload, successCallBack = null,  errorCallBack = null){
    var resource = "/login";

    return Repository.swapToken(process.env.VUE_APP_CLIENT_SECRET).post(`${resource}`, payload)
    .catch(() => {
      if(errorCallBack){
        successCallBack = null;
        errorCallBack();
      }
    })
    .then((data) => {
      if(successCallBack){
        successCallBack(data);
      }
    });
  },

  register(payload, successCallBack = null, errorCallBack = null){
    var resource = "/register";

    return Repository.$http.post(`${resource}`, payload)
    .catch(() => {
      if(errorCallBack){
        successCallBack = null;
        errorCallBack();
      }
    })
    .then((data) => {
      if(successCallBack){
        successCallBack(data);
      }
    });
  },

  loginCheck(userToken, successCallBack = null, errorCallBack = null){
    var resource = "/logincheck";

    return Repository.swapToken(userToken).post(`${resource}`)
    .catch(() => {
      if(errorCallBack){
        successCallBack = null;
        errorCallBack();
      }
    })
    .then((data) => {
      if(successCallBack){
        successCallBack(data);
      }
    });
  },

  logOut(userToken, successCallBack = null, errorCallBack = null){
    var resource = "/logout";

    return Repository.swapToken(userToken).post(`${resource}`)
    .catch(() => {
      if(errorCallBack){
        successCallBack = null;
        errorCallBack();
      }
    })
    .then((data) => {
      if(successCallBack){
        successCallBack(data);
      }
    });
  }

}

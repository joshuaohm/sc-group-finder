import Repository from "./Repository";


export default {

  login(payload, errorCallBack){
    var resource = "/login";

    return Repository.swapToken(process.env.VUE_APP_CLIENT_SECRET).post(`${resource}`, payload).catch(
      function() {
        if(errorCallBack){
          errorCallBack();
        }
      }
    );
  },

  register(payload, errorCallBack){
    var resource = "/register";

    return Repository.$http.post(`${resource}`, payload)
    .catch(
      function() {
        if(errorCallBack){
          errorCallBack();
        }
      }
    );
  },

  loginCheck(userToken, successCallBack = null, errorCallBack = null){
    var resource = "/logincheck";

    return Repository.swapToken(userToken).post(`${resource}`)
    .then(response => {
      if(successCallBack){
        console.log("success");
        console.log(response);
        successCallBack(response);
      }
    })
    .catch(error => {
      if(errorCallBack){
        console.log("error");
        errorCallBack();
      }
    });
  },

  logOut(userToken, errorCallBack = null){
    var resource = "/logout";

    return Repository.swapToken(userToken).post(`${resource}`)
    .catch(
      function() {
        if(errorCallBack){
          errorCallBack();
        }
      }
    );
  }

}

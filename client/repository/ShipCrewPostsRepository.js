import Repository from "./Repository";
import store from '../store'

const resource = "/posts/shipcrews";

export default {
  get(userToken, successCallBack = null, errorCallBack = null) {
    return Repository.$http.get(`${resource}`, { headers: {'Authorization' : 'Bearer '+userToken } })
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

  getPost(postId, successCallBack = null, errorCallBack = null){
    return Repository.$http.get(`${resource}/${postId}`)
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


  createPost(payload, successCallBack = null, errorCallBack = null){
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
  }

}

import Repository from "./Repository";
import store from '../store'

const resource = "/posts/shipcrews";

export default {
  get(userToken, successCallBack = null, errorCallBack = null) {
    return Repository.$http.get(`${resource}`, { headers: { 'Authorization': 'Bearer ' + userToken } })
      .catch((error) => {
        if (errorCallBack) {
          successCallBack = null;
          errorCallBack(error);
        }
      })
      .then((data) => {
        if (successCallBack) {
          successCallBack(data);
        }
      });
  },

  getPost(postId, successCallBack = null, errorCallBack = null) {
    return Repository.$http.get(`${resource}/${postId}`)
      .catch((error) => {
        if (errorCallBack) {
          successCallBack = null;
          errorCallBack(error);
        }
      })
      .then((data) => {
        if (successCallBack) {
          successCallBack(data);
        }
      });
  },


  createPost(userToken, payload, successCallBack = null, errorCallBack = null) {
    return Repository.swapToken(userToken).post(`${resource}`, payload)
      .catch((error) => {
        if (errorCallBack) {
          successCallBack = null;
          errorCallBack(error);
        }
      })
      .then((data) => {
        if (successCallBack) {
          successCallBack(data);
        }
      });
  }

}

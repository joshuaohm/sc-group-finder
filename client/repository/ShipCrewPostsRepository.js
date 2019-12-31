import Repository from "./Repository";
import store from '../store'



export default {
  get(userToken, successCallBack = null, errorCallBack = null) {
    var resource = "/posts/shipcrews";
    return Repository.swapToken(userToken).get(`${resource}`)
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

  getPost(userToken, postId, successCallBack = null, errorCallBack = null) {
    var resource = "/posts/shipcrews";
    return Repository.swapToken(userToken).get(`${resource}/${postId}`)
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

  getUsersPosts(userToken, userId, successCallBack = null, errorCallBack = null) {
    var resource = "/posts/shipcrews/user/" + userId;
    return Repository.swapToken(userToken).get(`${resource}`)
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

  requestPosition(userToken, position, successCallBack = null, errorCallBack = null) {
    var resource = "/posts/shipcrews/position/";
    return Repository.swapToken(userToken).post(`${resource}`, position)
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
    var resource = "/posts/shipcrews";
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

import Repository from "./Repository";
import store from '../store'

var resource = "";

export default {
  get(userToken, successCallBack = null, errorCallBack = null) {
    resource = "/ships";
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

  getAllManus(userToken, successCallBack = null, errorCallBack = null) {
    resource = '/manufacturers';
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

  getShip(userToken, postId, successCallBack = null, errorCallBack = null) {
    resource = "/ships";
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
  }
}

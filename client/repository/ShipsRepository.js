import Repository from "./Repository";
import store from '../store'

const resource = "/ships";

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

  getShip(postId, successCallBack = null, errorCallBack = null) {
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
  }
}

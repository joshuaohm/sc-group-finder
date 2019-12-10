import Repository from "./Repository";
import store from '../store'

var resource = "";

export default {
  get(userToken, successCallBack = null, errorCallBack = null) {
    resource = "/locations";
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

  getChildren(userToken, parentId, successCallBack = null, errorCallBack = null) {
    resource = '/locations/children/' + parentId;
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

  getType(userToken, type, successCallBack = null, errorCallBack = null) {
    resource = '/locations/type/' + type;
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

  getChildrenOfType(userToken, parentId, type, successCallBack = null, errorCallBack = null) {
    resource = '/locations/children/' + parentId + "/" + type;
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

}

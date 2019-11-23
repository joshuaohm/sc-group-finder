import Repository from "./Repository";
import store from '../store'

const resource = "/posts/shipcrews";

export default {
  get(userToken, errorCallBack = null) {
    return Repository.$http.get(`${resource}`, { headers: {'Authorization' : 'Bearer '+userToken } })
      .catch(
        function() {
          if(errorCallBack){
            errorCallBack();
          }
        }
      );
  },

  getPost(postId){
    return Repository.$http.get(`${resource}/${postId}`);
  },


  createPost(payload){
    return Repository.$http.post(`${resource}`, payload);
  }

}

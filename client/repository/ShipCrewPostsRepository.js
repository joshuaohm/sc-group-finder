import Repository from "./Repository";
import store from '../store'

const resource = "/posts/shipcrews";

export default {
  get(userToken) {
    return Repository.get(`${resource}`, { headers: {'Authorization' : 'Bearer '+userToken } });
  },

  getPost(postId){
    return Repository.get(`${resource}/${postId}`);
  },


  createPost(payload){
    return Repository.post(`${resource}`, payload);
  }

}

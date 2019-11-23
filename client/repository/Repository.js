import axios from 'axios';

const baseDom = "http://165.227.0.157";
const baseURL = `${baseDom}/api`;

function createAxios(token){

  return axios.create({
    baseURL: baseURL,
    headers: {
      'Authorization': "Bearer " + token,
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Application': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

var http = createAxios(process.env.VUE_APP_CLIENT_SECRET);

var swapToken = function(token){
  return createAxios(token);
};

export default {

  $http : http,
  swapToken: swapToken



};




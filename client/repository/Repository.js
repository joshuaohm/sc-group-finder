import axios from 'axios';

const baseDom = "http://165.227.0.157";
const baseURL = `${baseDom}/api`;

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': "Bearer: " + process.env.VUE_APP_CLIENT_SECRET,
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Application': 'application/json',
    'Content-Type': 'application/json'
  }
});

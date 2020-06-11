import axios from 'axios';
const instance = axios.create({
    // baseURL: 'http://hn.algolia.com/api/v1/',
    baseURL: 'http://hn.algolia.com/api/v1/search',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
  });

  export default instance;
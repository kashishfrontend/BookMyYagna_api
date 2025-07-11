import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.bookmyyagna.com',
  withCredentials: true, 
});

export default instance;

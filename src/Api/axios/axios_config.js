import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bookmyyogna.onrender.com',
  withCredentials: true, 
});

export default instance;

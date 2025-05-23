import axios from 'axios';
import { authService } from '../service/authService';


const instance = axios.create({
   
  baseURL: 'https://bookmyyogna.onrender.com', 

});

instance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
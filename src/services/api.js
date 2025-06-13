import axios from 'axios';

// Create an axios instance with base URL and default headers
const api = axios.create({
  baseURL: 'https://lifestockmarket.onrender.com',  
  withCredentials: true,                     
});

// Interceptor to inject auth token on every request
api.interceptors.request.use(
    
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
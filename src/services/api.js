import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lifestockmarket.onrender.com',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Read our stored auth object and pull out the token
  const stored = JSON.parse(localStorage.getItem('stockmart_auth') || '{}');
  const token = stored.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;

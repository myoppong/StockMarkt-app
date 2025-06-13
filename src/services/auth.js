import api from './api';

export const login = (credentials) => api.post('login', credentials);

export const register = (data) => api.post('/register', data);

export const logout = () => api.post('/logout');


// src/services/authService.js
import api from './api';

export const registerUser = async (formData) =>
  api.post('/register', formData); // Sends everything, including city

export const loginUser = async ({ identifier, password }) =>
  api.post('/login', { identifier, password });

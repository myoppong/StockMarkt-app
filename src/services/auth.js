// src/services/authService.js
import api from './api';

export const registerUser = async ({ username, email, phone, password, confirmPassword, role }) =>
  api.post('/register', { username, email, phone, password, confirmPassword, role });

export const loginUser = async ({ identifier, password }) =>
  api.post('/login', { identifier, password });

// src/services/categoryService.js
import api from './api';

// Get all categories
export const fetchCategories = async () => {
  const res = await api.get('/getCategories');
  return res.data;
};
// src/services/recommendationService.js
import api from './api';

// Recommended for you
export const fetchRecommended = async () => {
  const res = await api.get('/recommended');
  return res.data;
};

// Previously viewed by user
export const fetchViewed = async () => {
  const res = await api.get('/viewed');
  return res.data;
};

// Customers also viewed
export const fetchAlsoViewed = async () => {
  const res = await api.get('/also-viewed');
  return res.data;
};

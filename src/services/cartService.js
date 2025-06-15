import api from './api';

// Fetch all cart items for the logged-in user
export const fetchCart = () => api.get('/getcart');

// Add a product to the cart
export const addToCart = (productId, quantity = 1) =>
  api.post('/addcart', { productId, quantity });

// Update quantity of a specific product in the cart
export const updateCartItem = (productId, quantity) =>
  api.put(`/updatecart/${productId}`, { quantity });

// Remove a specific item from the cart
export const removeCartItem = (productId) =>
  api.delete(`/removecart/${productId}`);

// Clear the entire cart
export const clearCart = () => api.delete('/clearcart');

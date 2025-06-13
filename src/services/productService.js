// src/services/productService.js
import api from './api';

// Get all products
export const fetchProducts = async () => {
    const res = await api.get('/getProducts');
    return res.data;
};

// Create new product (with image upload)
export const createProduct = async (productData) => {
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    });

    const res = await api.post('/addproducts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

// Update product status
export const updateProductStatus = async (id, status) => {
    const res = await api.patch(`/products/${id}/status`, { status });
    return res.data;
};

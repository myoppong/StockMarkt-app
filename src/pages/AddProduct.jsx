// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import api from '../services/api'; // your configured Axios instance
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    weight: '',
    age: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== '') formData.append(key, val);
    });

    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await api.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product created:', res.data);
      navigate('/'); // or wherever you want
    } catch (err) {
      console.error('Upload failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />

        <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" placeholder="Price" className="w-full p-2 border rounded" />
        <input name="categoryId" value={form.categoryId} onChange={handleChange} type="number" placeholder="Category ID" className="w-full p-2 border rounded" />
        <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (optional)" className="w-full p-2 border rounded" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age (optional)" className="w-full p-2 border rounded" />

        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover mt-2 rounded" />}

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}

// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import api from "../services/api";
import { addToCart } from "../services/cartService";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { auth: user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate("/login", { state: { from: `/products/${id}` } });
    try {
      setAdding(true);
      await addToCart(product.id, 1);
      alert("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleBuy = () => {
    if (!user) return navigate('/login', { state: { from: `/products/${id}` } });
    navigate(`/checkout/${product.id}`); // triggers single-product checkout
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={product.imageUrl || "https://via.placeholder.com/600"}
        alt={product.name}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-3xl font-semibold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">Category: {product.category?.name}</p>
      <p className="text-xl font-bold text-green-600 mt-2">${product.price}</p>
      <p className="mt-2">Weight: {product.weight || "N/A"}</p>
      <p className="mt-1">Age: {product.age || "N/A"}</p>
      <p className="mt-4">{product.description}</p>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleBuy}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`py-2 px-6 bg-green-600 text-white rounded hover:bg-green-700 transition ${adding ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

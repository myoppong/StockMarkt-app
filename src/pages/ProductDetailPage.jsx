// src/components/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch product from API by id
    setProduct({
      id,
      name: "Sample Animal",
      category: "Cattle",
      price: 200,
      image: "https://via.placeholder.com/600",
      description: "Healthy adult cattle ready for sale.",
    });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleBuy = () => {
    if (!user) return navigate('/login', { state: { from: `/product/${id}` } });
    navigate(`/checkout/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
      <h1 className="text-3xl font-semibold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">Category: {product.category}</p>
      <p className="text-xl font-bold text-green-600 mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <button
        onClick={handleBuy}
        className="mt-6 py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Buy Now
      </button>
    </div>
  );
}
// src/components/BrowseLivestockPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BrowseLivestockPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: fetch livestock from API
    setProducts([
      {
        id: "1",
        name: "Cattle",
        price: 200,
        image: "https://via.placeholder.com/300",
      },
      {
        id: "2",
        name: "Goat",
        price: 80,
        image: "https://via.placeholder.com/300",
      },
    ]);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(product => (
        <Link to={`/product/${product.id}`} key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-green-600 font-bold">${product.price}</p>
        </Link>
      ))}
    </div>
  );
}

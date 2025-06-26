// src/components/BrowseLivestockPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../services/api.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BrowseLivestockPage() {
  const query       = useQuery();
  const searchTerm  = query.get("search") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/search", {
          params: searchTerm ? { search: searchTerm } : {}
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Could not load livestock. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Showing results for {searchTerm && <> “{searchTerm}”</>}
      </h2>

      {loading && <p className="text-center">Loading livestock…</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500">No livestock found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

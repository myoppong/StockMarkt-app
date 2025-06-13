// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {fetchCategories} from "../services/categoryService";
import {fetchProducts} from "../services/productService";
import {fetchRecommended,fetchViewed,fetchAlsoViewed} from "../services/recommendationService";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [alsoViewed, setAlsoViewed] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          catData,
          prodData,
          recData,
          viewData,
          alsoData
        ] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          fetchRecommended(),
          fetchViewed(),
          fetchAlsoViewed()
        ]);

        setCategories(catData);
        setProducts(prodData);
        setFiltered(prodData);
        setRecommended(recData);
        setViewed(viewData);
        setAlsoViewed(alsoData);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCat) {
      setFiltered(products.filter(p => p.categoryId === selectedCat));
    } else {
      setFiltered(products);
    }
  }, [selectedCat, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  const renderSection = (title, items) =>
    items.length > 0 && (
      <section className="px-4 my-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-x-auto py-2">
          {items.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="min-w-[200px] bg-white rounded-lg shadow transition"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-md font-semibold truncate">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold mt-1">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Banner */}
   <section className="h-64 md:h-96 relative overflow-hidden">
  {/* Farm background image */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url(https://images.pexels.com/photos/2132115/pexels-photo-2132115.jpeg?auto=compress&cs=tinysrgb&w=1600)" }}
  ></div>
  
  {/* Animated Animals */}
  <motion.div 
    className="absolute bottom-0 left-10"
    animate={{ x: [0, 20, 0] }}
    transition={{ 
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <img 
      src="https://cdn-icons-png.flaticon.com/512/2317/2317898.png" 
      alt="Cow" 
      className="w-16 h-16 md:w-24 md:h-24 filter drop-shadow-lg"
    />
  </motion.div>
  
  <motion.div 
    className="absolute bottom-0 right-1/4"
    animate={{ x: [0, -30, 0] }}
    transition={{ 
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5
    }}
  >
    <img 
      src="https://cdn-icons-png.flaticon.com/512/194/194279.png" 
      alt="Sheep" 
      className="w-14 h-14 md:w-20 md:h-20 filter drop-shadow-lg"
    />
  </motion.div>
  
  <motion.div 
    className="absolute bottom-0 left-1/3"
    animate={{ 
      x: [0, 25, 0],
      y: [0, -5, 0] 
    }}
    transition={{ 
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }}
  >
    <img 
      src="https://cdn-icons-png.flaticon.com/512/2350/2350180.png" 
      alt="Goat" 
      className="w-12 h-12 md:w-18 md:h-18 filter drop-shadow-lg"
    />
  </motion.div>
  
  {/* Dark overlay for text contrast */}
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
  
  {/* Title with entrance animation */}
  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center z-10 relative"
  >
    Welcome to StockMart
  </motion.h1>
</section>

      {/* Category Filter */}
      <section className="my-8 px-4 max-w-7xl mx-auto">
        <div className="flex space-x-4 overflow-x-auto py-2">
          <button
            onClick={() => setSelectedCat(null)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCat === null
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 shadow"
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCat === cat.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Main Products Grid */}
      <section className="px-4 pb-12 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">
                      {product.name}
                    </h3>
                    <p className="text-green-600 font-bold mt-2">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Dynamic Recommendation Sections */}
      {renderSection("Recommended For You", recommended)}
      {renderSection("You Viewed", viewed)}
      {renderSection("Customers Also Viewed", alsoViewed)}
    </div>
  );
}

// src/components/WishlistPage.jsx
import React, { useState, useEffect } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // TODO: Fetch wishlist
    setWishlist([
      { id: 1, name: "White Goat", price: 150, image: "https://via.placeholder.com/300" },
    ]);
  }, []);

  const removeItem = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? <p>Your wishlist is empty.</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map(item => (
            <div key={item.id} className="bg-white rounded shadow p-4">
              <img src={item.image} alt={item.name} className="h-48 w-full object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-green-600 font-bold">${item.price}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
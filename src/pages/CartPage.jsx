// src/components/CartPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]); // TODO: replace with real state
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) return navigate('/login', { state: { from: '/cart' } });
    navigate('/checkout');
  };

  if (cartItems.length === 0)
    return <div className="p-4">Your cart is empty.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded shadow mb-4">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
          </div>
          <div>
            <button className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
          </div>
        </div>
      ))}
      <button
        onClick={handleCheckout}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
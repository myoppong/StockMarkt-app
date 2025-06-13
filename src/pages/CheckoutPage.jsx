// src/components/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // optional: single product checkout
  const [address, setAddress] = useState("");

  const handleConfirm = () => {
    // TODO: call API to create order, handle escrow
    alert('Order placed successfully!');
    navigate('/orders');
  };

  if (!user) return navigate('/login', { state: { from: location } });

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Delivery Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleConfirm}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}
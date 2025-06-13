// src/components/SellerDashboard.jsx
import React, { useState, useEffect } from "react";

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: Fetch orders for this seller
    setOrders([
      { id: 1, buyer: "john@example.com", item: "Cattle", status: "Pending" },
      { id: 2, buyer: "mary@example.com", item: "Goat", status: "Shipped" },
    ]);
  }, []);

  const updateStatus = (id, status) => {
    // TODO: Update order status via API
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Seller Dashboard</h2>
      {orders.map(order => (
        <div key={order.id} className="p-4 mb-3 bg-white rounded shadow">
          <p><strong>Item:</strong> {order.item}</p>
          <p><strong>Buyer:</strong> {order.buyer}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => updateStatus(order.id, "Shipped")}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Mark Shipped
            </button>
            <button
              onClick={() => updateStatus(order.id, "Delivered")}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Mark Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
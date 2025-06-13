// src/components/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch real orders from API
    setOrders([
      {
        id: "1",
        product: "Cattle",
        price: 200,
        date: "2025-06-01",
        status: "Delivered"
      },
      {
        id: "2",
        product: "Goat",
        price: 80,
        date: "2025-06-05",
        status: "Pending"
      },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{order.product}</h3>
                  <p className="text-gray-500">Ordered on: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">${order.price}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
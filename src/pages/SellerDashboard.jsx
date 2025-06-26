// src/components/SellerDashboard.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import ProductForm from "../components/ProductForm.jsx";

// 1) Labels your users see
const STATUS_OPTIONS = ["IN STOCK", "FEW LEFT", "OUT OF STOCK"];

// 2) Helpers to map back and forth
const labelToEnum = (label) => label.replace(/ /g, "_");
const enumToLabel = (value) => value.replace(/_/g, " ");

export default function SellerDashboard() {
  const [orders, setOrders]     = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [orderRes, productRes] = await Promise.all([
        api.get("/myorders"),
        api.get("/myproducts"),
      ]);
      setOrders(orderRes.data || []);
      setProducts(productRes.data || []);
    } catch (err) {
      console.error("Dashboard load error", err);
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    await api.patch(`/orders/${orderId}/status`, { status });
    fetchData();
  };

  const updateProductStatus = async (productId, label) => {
    const enumVal = labelToEnum(label);
    await api.patch(`/products/${productId}/status`, { status: enumVal });
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <h2 className="text-3xl font-bold text-gray-800">Seller Dashboard</h2>

      {/* --- Orders Section --- */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1">
                <p>
                  <span className="font-medium">Buyer:</span>{" "}
                  {order.user.email}
                </p>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  {order.items.map((it) => (
                    <li key={it.id}>
                      {it.product.name} × {it.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 md:mt-0 md:ml-8 text-gray-700">
                <p>
                  <span className="font-medium"> Payment Status:</span>{" "}
                  {order.paymentStatus}
                </p>

                <p>
                  <span className="font-medium">Order Status:</span>{" "}
                  {order.status}
                </p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Mark Shipped
                  </button>
                  <button
                    onClick={() =>
                      updateOrderStatus(order.id, "DELIVERED")
                    }
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Products Section --- */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-700">
            Your Products
          </h3>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add Product
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="p-4 bg-white rounded-lg shadow flex items-center"
            >
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{prod.name}</p>
                <p className="text-sm text-gray-500">{prod.category.name}</p>
                <p className="text-sm text-gray-700 mt-1">${prod.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Status:</p>
                <select
                  value={enumToLabel(prod.status)}
                  onChange={(e) =>
                    updateProductStatus(prod.id, e.target.value)
                  }
                  className="px-2 py-1 border rounded bg-gray-50"
                >
                  {STATUS_OPTIONS.map((lbl) => (
                    <option key={lbl} value={lbl}>
                      {lbl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Add Product Modal --- */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h4 className="text-xl font-semibold mb-4">Add New Product</h4>
            <ProductForm
              onSuccess={() => {
                setShowForm(false);
                fetchData();
              }}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-red-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

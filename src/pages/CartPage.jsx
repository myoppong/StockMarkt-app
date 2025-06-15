// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import {
  updateCartItem,
  removeCartItem,
  clearCart
} from '../services/cartService';
import { Link, useNavigate } from 'react-router-dom'; 

export default function CartPage() {
  const { auth } = useAuth();
  const { items, loading, reload } = useCart();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate(); 

  if (!auth) {
    return (
      <div className="p-8 text-center">
        <p>
          Please{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            sign in
          </Link>{' '}
          to view your cart.
        </p>
      </div>
    );
  }

  if (loading || updating) {
    return <p className="p-8 text-center">Loading cart…</p>;
  }

  if (!items.length) {
    return <p className="p-8 text-center">Your cart is empty.</p>;
  }

  const handleQuantityChange = async (productId, delta) => {
    const item = items.find(i => i.productId === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    setUpdating(true);
    await updateCartItem(productId, newQty);
    await reload();
    setUpdating(false);
  };

  const handleRemove = async (productId) => {
    setUpdating(true);
    await removeCartItem(productId);
    await reload();
    setUpdating(false);
  };

  const total = items.reduce(
    (sum, i) => sum + i.quantity * i.product.price,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>

      <ul className="space-y-4">
        {items.map(item => (
          <li
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.productId, -1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                –
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.productId, +1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => handleRemove(item.productId)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={async () => {
            setUpdating(true);
            await clearCart();
            await reload();
            setUpdating(false);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear Cart
        </button>

        <div className="text-right">
          <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          <Link to="/checkout">
  <button className="bg-green-600 text-white px-4 py-2 rounded">
    Proceed to Checkout
  </button>
</Link>

        </div>
      </div>
    </div>
  );
}

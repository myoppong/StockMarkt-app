// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import api from "../services/api.js";
import { processPayment } from "../services/paymentService.js";

// Full list of 16 cities
const CITY_OPTIONS = [
  "ACCRA","KUMASI","TAMALE","CAPE_COAST",
  "SUNYANI","HO","KOFORIDUA","TAKORADI",
  "WA","BOLGATANGA","TECHIMAN","SEFWI_WIAWSO",
  "NALERIGU","DINDI","SANDRAWA","GOASO"
];

export default function CheckoutPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // optional single-product

  const [items, setItems]             = useState([]);
  const [buyerCity, setBuyerCity]     = useState(CITY_OPTIONS[0]);
  const [pickupOnly, setPickupOnly]   = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("pay_on_delivery");
  const [momoPhone, setMomoPhone]     = useState("");
  const [loading, setLoading]         = useState(true);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState("");

  // redirect if not logged in
  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // fetch items + deliveryFee
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get("/checkout-items", {
          params: {
            ...(id ? { productId: id } : {}),
            buyerCity: pickupOnly ? undefined : buyerCity
          }
        });
        setItems(res.data.items || []);
        setDeliveryFee(pickupOnly ? 0 : (res.data.deliveryFee || 0));
      } catch (err) {
        console.error("Load failed:", err);
        setError("Could not load checkout items.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, buyerCity, pickupOnly]);

  const itemsTotal = items.reduce(
    (sum, it) => sum + it.quantity * it.product.price,
    0
  );
  const grandTotal = itemsTotal + (pickupOnly ? 0 : deliveryFee);

  const handleConfirm = async () => {
    setError("");
    if (!items.length) {
      return setError("No items to checkout.");
    }
    setSubmitting(true);

    try {
      // 1) create the order record
      const orderRes = await api.post("/createorder", {
        buyerCity: pickupOnly
          ? items[0].product.seller.city
          : buyerCity,
        pickup: pickupOnly,
        deliveryFee,
        paymentMethod,
        items: items.map(i => ({
          productId: i.product.id,
          quantity: i.quantity
        }))
      });
      const order = orderRes.data;

      // 2) if mobile money, initialize Paystack & redirect
      if (paymentMethod === "paystack_momo") {
        const { authorization_url } = await processPayment(
          order.id,
          paymentMethod,
          { phoneNumber: momoPhone, email: auth.user.email }
        );
        window.location.href = authorization_url;
      } else {
        // pay_on_delivery
        alert("Order placed! You’ll pay on delivery.");
        navigate("/orders");
      }
    } catch (err) {
      console.error("Order failed:", err);
      setError("Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-8 text-center">Loading…</p>;
  }
  if (!items.length) {
    return <p className="p-8 text-center">No items to checkout.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Pick-up toggle */}
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={pickupOnly}
          onChange={() => setPickupOnly(p => !p)}
          className="form-checkbox h-5 w-5 text-green-600"
        />
        <span className="ml-2">Pick up at seller’s location (no fee)</span>
      </label>

      {/* City select */}
      {!pickupOnly && (
        <div className="mb-6">
          <label className="block mb-1">Delivery City</label>
          <select
            value={buyerCity}
            onChange={e => setBuyerCity(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            {CITY_OPTIONS.map(c => (
              <option key={c} value={c}>
                {c.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Items */}
      <ul className="divide-y mb-6">
        {items.map(item => (
          <li key={item.id} className="flex justify-between py-4">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="mb-6 space-y-1 text-right">
        <p>Items Total: ${itemsTotal.toFixed(2)}</p>
        <p>Delivery Fee: ${pickupOnly ? "0.00" : deliveryFee.toFixed(2)}</p>
        <p className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
      </div>

      {/* Payment Method */}
      <fieldset className="mb-4">
        <legend className="font-medium mb-2">Payment Method</legend>
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            name="payment"
            value="pay_on_delivery"
            checked={paymentMethod === "pay_on_delivery"}
            onChange={() => setPaymentMethod("pay_on_delivery")}
            className="form-radio"
          />
          <span className="ml-2">Pay on Delivery</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="payment"
            value="paystack_momo"
            checked={paymentMethod === "paystack_momo"}
            onChange={() => setPaymentMethod("paystack_momo")}
            className="form-radio"
          />
          <span className="ml-2">Mobile Money (Paystack)</span>
        </label>
      </fieldset>

      {/* Momo phone */}
      {paymentMethod === "paystack_momo" && (
        <div className="mb-4">
          <label className="block mb-1">Momo Phone Number</label>
          <input
            type="tel"
            value={momoPhone}
            onChange={e => setMomoPhone(e.target.value)}
            placeholder="+233XXXXXXXXX"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      )}

      {/* Confirm */}
      <button
        onClick={handleConfirm}
        disabled={submitting}
        className={`w-full py-2 rounded text-white ${
          submitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {submitting ? "Processing…" : "Confirm Purchase"}
      </button>
    </div>
  );
}

// // src/components/OrdersPage.jsx
// import React, { useEffect, useState } from "react";
// import api from "../services/api.js";
// import { useAuth } from "../contexts/AuthContext.jsx";

// export default function OrdersPage() {
//   const { auth } = useAuth();
//   const [orders, setOrders]   = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/getorders");
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Failed to load orders", err);
//         setError("Could not load your orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const cancelOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;
//     try {
//       await api.patch(`/orders/${orderId}/status`, { status: "CANCELLED" });
//       setOrders(o => o.map(ord =>
//         ord.id === orderId ? { ...ord, paymentStatus: "CANCELLED" } : ord
//       ));
//     } catch (err) {
//       console.error("Cancel failed", err);
//       alert("Failed to cancel order.");
//     }
//   };

//   const trackOrder = (orderId) => {
//     // replace with real tracking logic
//     alert(`Tracking for order ${orderId} coming soon!`);
//   };

//   if (loading) return <p className="p-8 text-center">Loading your orders…</p>;
//   if (error)   return <p className="p-8 text-center text-red-600">{error}</p>;
//   if (!orders.length) return <p className="p-8 text-center">You have no orders yet.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h2 className="text-2xl font-semibold">Your Orders</h2>

//       {orders.map(order => {
//         const placedOn    = new Date(order.createdAt).toLocaleDateString();
//         const itemsTotal  = order.items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
//         const seller      = order.items[0]?.product.seller || {};
//         const sellerPhone = seller.phone || "";

//         return (
//           <div key={order.id} className="p-4 bg-white rounded shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-lg font-medium">Order #{order.id}</h3>
//                 <p className="text-sm text-gray-500">Placed on {placedOn}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-green-600 font-bold">${order.totalAmount.toFixed(2)}</p>
//                 <p className="text-sm text-gray-600">Order Status {order.status}</p>
//                 <p className="text-sm text-gray-600"> Payment Status {order.paymentStatus}</p>
//               </div>
//             </div>

//             {/* Line items */}
//             <ul className="mt-3 space-y-1">
//               {order.items.map(it => (
//                 <li key={it.id} className="text-gray-700">
//                   • {it.product.name} × {it.quantity} @ ${it.unitPrice.toFixed(2)}
//                 </li>
//               ))}
//             </ul>

//             {/* Action buttons */}
//             <div className="mt-4 flex flex-wrap gap-2">
//               {order.paymentStatus === "PENDING" && (
//                 <button
//                   onClick={() => cancelOrder(order.id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Cancel
//                 </button>
//               )}
//               {order.paymentStatus === "SHIPPED" && (
//                 <button
//                   onClick={() => trackOrder(order.id)}
//                   className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Track
//                 </button>
//               )}
//               {sellerPhone && (
//                 <a
//                   href={`tel:${sellerPhone}`}
//                   className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                 >
//                   Call Seller
//                 </a>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


// src/components/OrdersPage.jsx
// import React, { useEffect, useState } from "react";
// import api from "../services/api.js";
// import { useAuth } from "../contexts/AuthContext.jsx";
// import { Clock, CheckCircle, Truck, XCircle, CreditCard } from "lucide-react";

// export default function OrdersPage() {
//   const { auth } = useAuth();
//   const [orders, setOrders]   = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState("");

//   // Fetch orders on mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/getorders");
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Failed to load orders", err);
//         setError("Could not load your orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Config for status badges
//   const statusConfig = {
//     PENDING:   { icon: <Clock size={16} />,      color: "bg-yellow-100 text-yellow-800",   label: "Pending" },
//     INITIATED: { icon: <CreditCard size={16} />,  color: "bg-blue-100 text-blue-800",       label: "Awaiting Payment" },
//     PAID:      { icon: <CheckCircle size={16} />, color: "bg-green-100 text-green-800",      label: "Paid" },
//     SHIPPED:   { icon: <Truck size={16} />,       color: "bg-blue-100 text-blue-800",       label: "Shipped" },
//     CANCELLED: { icon: <XCircle size={16} />,     color: "bg-red-100 text-red-800",         label: "Cancelled" },
//   };

//   // Cancel order handler
//   const cancelOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;
//     try {
//       await api.patch(`/orders/${orderId}/status`, { status: "CANCELLED" });
//       setOrders(o => o.map(ord =>
//         ord.id === orderId
//           ? { ...ord, paymentStatus: "CANCELLED", status: "CANCELLED" }
//           : ord
//       ));
//     } catch (err) {
//       console.error("Cancel failed", err);
//       alert("Failed to cancel order.");
//     }
//   };

//   // Track order handler
//   const trackOrder = (orderId) => {
//     alert(`Tracking for order #${orderId} coming soon!`);
//   };

//   if (loading) return <p className="p-8 text-center text-gray-500">Loading your orders…</p>;
//   if (error)   return <p className="p-8 text-center text-red-600">{error}</p>;
//   if (!orders.length) return <p className="p-8 text-center text-gray-600">You have no orders yet.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h2 className="text-3xl font-bold text-green-700">Your Orders</h2>

//       {orders.map(order => {
//         const placedOn    = new Date(order.createdAt).toLocaleDateString();
//         const orderStat   = statusConfig[order.status]         || statusConfig.PENDING;
//         const paymentStat = statusConfig[order.paymentStatus]  || statusConfig.PENDING;
//         const sellerPhone = order.items[0]?.product.seller.phone;

//         return (
//           <div key={order.id} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
//             {/* Header */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-xl font-semibold">Order #{order.id}</h3>
//                 <p className="text-sm text-gray-500">Placed on {placedOn}</p>
//               </div>
//               <div className="flex flex-col space-y-2 items-end">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm font-medium text-gray-600">Order Status:</span>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded ${orderStat.color}`}>
//                     {orderStat.icon} {orderStat.label}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm font-medium text-gray-600">Payment Status:</span>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded ${paymentStat.color}`}>
//                     {paymentStat.icon} {paymentStat.label}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Line Items */}
//             <ul className="mt-4 space-y-2 text-gray-700">
//               {order.items.map(it => (
//                 <li key={it.id} className="flex justify-between">
//                   <span>{it.product.name} × {it.quantity}</span>
//                   <span>${it.unitPrice.toFixed(2)}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* Actions */}
//             <div className="mt-4 flex flex-wrap gap-3">
//               {order.paymentStatus === "PENDING" && (
//                 <button
//                   onClick={() => cancelOrder(order.id)}
//                   className="flex-1 md:flex-none px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow"
//                 >
//                   Cancel Order
//                 </button>
//               )}
//               {order.status === "SHIPPED" && (
//                 <button
//                   onClick={() => trackOrder(order.id)}
//                   className="flex-1 md:flex-none px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow"
//                 >
//                   Track Shipment
//                 </button>
//               )}
//               {sellerPhone && (
//                 <a
//                   href={`tel:${sellerPhone}`}
//                   className="flex-1 md:flex-none px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium shadow text-center"
//                 >
//                   Call Seller
//                 </a>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


// src/components/OrdersPage.jsx
// import React, { useEffect, useState } from "react";
// import api from "../services/api.js";
// import { useAuth } from "../contexts/AuthContext.jsx";
// import { Clock, CheckCircle, Truck, XCircle, CreditCard } from "lucide-react";

// export default function OrdersPage() {
//   const { auth } = useAuth();
//   const [orders, setOrders]   = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/getorders");
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Failed to load orders", err);
//         setError("Could not load your orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const statusConfig = {
//     PENDING:   { icon: <Clock size={16} />,      color: "bg-yellow-100 text-yellow-800",   label: "Pending" },
//     INITIATED: { icon: <CreditCard size={16} />,  color: "bg-blue-100 text-blue-800",       label: "Awaiting Payment" },
//     PAID:      { icon: <CheckCircle size={16} />, color: "bg-green-100 text-green-800",      label: "Paid" },
//     SHIPPED:   { icon: <Truck size={16} />,       color: "bg-blue-100 text-blue-800",       label: "Shipped" },
//     CANCELLED: { icon: <XCircle size={16} />,     color: "bg-red-100 text-red-800",         label: "Cancelled" },
//   };

//   const cancelOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;
//     try {
//       await api.patch(`/orders/${orderId}/status`, { status: "CANCELLED" });
//       setOrders(o => o.map(ord =>
//         ord.id === orderId
//           ? { ...ord, paymentStatus: "CANCELLED", status: "CANCELLED" }
//           : ord
//       ));
//     } catch (err) {
//       console.error("Cancel failed", err);
//       alert("Failed to cancel order.");
//     }
//   };

//   const trackOrder = (orderId) => {
//     alert(`Tracking for order #${orderId} coming soon!`);
//   };

//   if (loading) return <p className="p-8 text-center text-gray-500">Loading your orders…</p>;
//   if (error)   return <p className="p-8 text-center text-red-600">{error}</p>;
//   if (!orders.length) return <p className="p-8 text-center text-gray-600">You have no orders yet.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h2 className="text-3xl font-bold text-green-700">Your Orders</h2>

//       {orders.map(order => {
//         const placedOn    = new Date(order.createdAt).toLocaleDateString();
//         const orderStat   = statusConfig[order.status]         || statusConfig.PENDING;
//         const paymentStat = statusConfig[order.paymentStatus]  || statusConfig.PENDING;
//         const sellerPhone = order.items[0]?.product.seller.phone;

//         return (
//           <div key={order.id} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//               <div>
//                 <h3 className="text-xl font-semibold">Order #{order.id}</h3>
//                 <p className="text-sm text-gray-500">Placed on {placedOn}</p>
//               </div>
//               <div className="flex flex-col sm:flex-row sm:space-x-4 mt-3 sm:mt-0">
//                 {/* Order Status */}
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm font-medium text-gray-600">Order Status:</span>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded ${orderStat.color}`}>
//                     {orderStat.icon} {orderStat.label}
//                   </span>
//                 </div>
//                 {/* Payment Status */}
//                 <div className="flex items-center space-x-2 mt-2 sm:mt-0">
//                   <span className="text-sm font-medium text-gray-600">Payment Status:</span>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded ${paymentStat.color}`}>
//                     {paymentStat.icon} {paymentStat.label}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Line Items */}
//             <ul className="mt-4 space-y-2 text-gray-700">
//               {order.items.map(it => (
//                 <li key={it.id} className="flex justify-between">
//                   <span>{it.product.name} × {it.quantity}</span>
//                   <span>${it.unitPrice.toFixed(2)}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* Actions */}
//             <div className="mt-4 flex flex-col sm:flex-row gap-3">
//               {order.paymentStatus === "PENDING" && (
//                 <button
//                   onClick={() => cancelOrder(order.id)}
//                   className="flex-1 sm:flex-none px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow text-center"
//                 >
//                   Cancel Order
//                 </button>
//               )}

//               {order.status === "SHIPPED" && (
//                 <button
//                   onClick={() => trackOrder(order.id)}
//                   className="flex-1 sm:flex-none px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow text-center"
//                 >
//                   Track Shipment
//                 </button>
//               )}

//               {sellerPhone && (
//                 <a
//                   href={`tel:${sellerPhone}`}
//                   className="flex-1 sm:flex-none px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium shadow text-center"
//                 >
//                   Call Seller
//                 </a>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// src/components/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Clock, CheckCircle, Truck, XCircle, CreditCard } from "lucide-react";

export default function OrdersPage() {
  const { auth } = useAuth();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/getorders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
        setError("Could not load your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusConfig = {
    PENDING:   { icon: <Clock size={16} />,      color: "bg-yellow-100 text-yellow-800",   label: "Pending" },
    INITIATED: { icon: <CreditCard size={16} />,  color: "bg-blue-100 text-blue-800",       label: "Awaiting Payment" },
    PAID:      { icon: <CheckCircle size={16} />, color: "bg-green-100 text-green-800",      label: "Paid" },
    SHIPPED:   { icon: <Truck size={16} />,       color: "bg-blue-100 text-blue-800",       label: "Shipped" },
    CANCELLED: { icon: <XCircle size={16} />,     color: "bg-red-100 text-red-800",         label: "Cancelled" },
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.patch(`/orders/${orderId}/status`, { status: "CANCELLED" });
      setOrders(o =>
        o.map(ord =>
          ord.id === orderId
            ? { ...ord, status: "CANCELLED", paymentStatus: "CANCELLED" }
            : ord
        )
      );
    } catch (err) {
      console.error("Cancel failed", err);
      alert("Failed to cancel order.");
    }
  };

  const trackOrder = (orderId) => {
    alert(`Tracking for order #${orderId} coming soon!`);
  };

  if (loading) return <p className="p-8 text-center text-gray-500">Loading your orders…</p>;
  if (error)   return <p className="p-8 text-center text-red-600">{error}</p>;
  if (!orders.length) return <p className="p-8 text-center text-gray-600">You have no orders yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-green-700">Your Orders</h2>

      {orders.map(order => {
        const placedOn    = new Date(order.createdAt).toLocaleDateString();
        const orderStat   = statusConfig[order.status]         || statusConfig.PENDING;
        const paymentStat = statusConfig[order.paymentStatus]  || statusConfig.PENDING;
        const sellerPhone = order.items[0]?.product.seller.phone;

        return (
          <div key={order.id} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">Placed on {placedOn}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 mt-3 sm:mt-0">
                {/* Order Status */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Order Status:</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded ${orderStat.color}`}>
                    {orderStat.icon} {orderStat.label}
                  </span>
                </div>
                {/* Payment Status */}
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <span className="text-sm font-medium text-gray-600">Payment Status:</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded ${paymentStat.color}`}>
                    {paymentStat.icon} {paymentStat.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <ul className="mt-4 space-y-2 text-gray-700">
              {order.items.map(it => (
                <li key={it.id} className="flex justify-between">
                  <span>{it.product.name} × {it.quantity}</span>
                  <span>${it.unitPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {/* only if order not cancelled */}
              {order.status !== "CANCELLED" && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="flex-1 sm:flex-none px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow text-center"
                >
                  Cancel Order
                </button>
              )}

              {order.status === "SHIPPED" && (
                <button
                  onClick={() => trackOrder(order.id)}
                  className="flex-1 sm:flex-none px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow text-center"
                >
                  Track Shipment
                </button>
              )}

              {sellerPhone && (
                <a
                  href={`tel:${sellerPhone}`}
                  className="flex-1 sm:flex-none px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium shadow text-center"
                >
                  Call Seller
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}


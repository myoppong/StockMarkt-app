// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";      // ← import
import HomePage from "./pages/HomePage.jsx";
import BrowseLivestockPage from "./pages/BrowseLivestockPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AddProduct from "./pages/AddProduct.jsx";

export default function App() {
  return (
    <AuthProvider>
      {/* Full-height flex column: navbar at top, footer at bottom */}
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Main content grows to fill */}
        <main className="flex-grow pt-20">
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowseLivestockPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Seller only */}
            <Route
              path="/add-product"
              element={
                <ProtectedRoute roles={['SELLER']}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            {/* Authenticated */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/:id?"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sellerdashboard"
              element={
                <ProtectedRoute>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer sticks to bottom */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

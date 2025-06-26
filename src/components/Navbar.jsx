// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { auth, logout } = useAuth();
  const { items: cartItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/browse?search=${encodeURIComponent(searchTerm)}`);
  };

  const user = auth?.user;

  return (
    <header className="w-full shadow-md sticky top-0 bg-white z-50">
      {/* Upper Navbar */}
      <div className="bg-green-600 text-white text-sm py-2 px-4 flex justify-between items-center">
        <p>Buy or Sell on StockMart</p>
        <p>🐄 Livestock available now!</p>
      </div>

      {/* Lower Navbar */}
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          LifeStockMart
        </Link>

        {/* Mobile Hamburger */}
        <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center w-full max-w-xl mx-4 space-x-2"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search livestock..."
            className="w-full px-4 py-2 border rounded focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Search
          </button>
        </form>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6 relative">
          {/* Account Dropdown */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <User />
            <span className="ml-1">{user ? user.username : "Account"}</span>
            <ChevronDown className="ml-1" />
          </div>

          {dropdownOpen && (
            <div className="absolute top-14 right-0 bg-white shadow-lg border rounded w-48 text-sm z-50">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  {user.role === "SELLER" && (
                    <Link
                      to="/sellerdashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-lg flex flex-col items-center py-4 space-y-4">
          <Link to="/">Home</Link>
          <Link to="/browse">Livestock</Link>
          {!user ? (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/orders">My Orders</Link>
              {user.role === "SELLER" && (
                <Link to="/sellerdashboard">Seller Dashboard</Link>
              )}
              <button onClick={logout}>Sign Out</button>
            </>
          )}
          <button onClick={() => navigate("/cart")}>
            Cart ({cartItems.length})
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

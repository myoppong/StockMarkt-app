// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/browse?search=${encodeURIComponent(searchTerm)}`);
  };

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
          StockMart
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} className="text-green-600" /> : <Menu size={24} className="text-green-600" />}
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center w-full max-w-xl mx-4 space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search livestock..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            Search
          </button>
        </form>

        {/* Desktop Links & Dropdown */}
        <div className="hidden sm:flex items-center space-x-6 relative">
          {/* Account */}
          <div className="flex items-center cursor-pointer relative" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <User size={20} />
            <span className="ml-1 hidden sm:inline">{user ? user.email : "Account"}</span>
            <ChevronDown size={18} className="ml-1" />

            {dropdownOpen && (
              <div className="absolute top-10 right-0 bg-white shadow-md border rounded w-48 text-sm z-50">
                {!user ? (
                  <>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Sign In</Link>
                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Sign Out</button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="cursor-pointer relative" onClick={() => navigate('/cart')}>
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {/* TODO: dynamic count */}3
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md flex flex-col items-center py-4 space-y-4">
          <Link to="/" className="text-sm">Home</Link>
          <Link to="/browse" className="text-sm">Livestock</Link>
          {!user ? (
            <>
              <Link to="/login" className="text-sm">Sign In</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-sm">Profile</Link>
              <Link to="/orders" className="text-sm">My Orders</Link>
              <button onClick={logout} className="text-sm">Sign Out</button>
            </>
          )}
          <Link to="/cart" className="text-sm">Cart</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;

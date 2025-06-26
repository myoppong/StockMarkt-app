// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h4 className="text-white text-xl font-semibold mb-4">LifeStockMart</h4>
          <p className="text-sm leading-relaxed">
            Your one-stop marketplace for healthy, ethically-sourced livestock.  
            Join thousands of farmers & buyers nationwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-white font-semibold mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/browse" className="hover:text-white">Browse Livestock</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-white">My Orders</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-white font-semibold mb-3">Resources</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/support" className="hover:text-white">Support</a></li>
            <li><a href="/terms" className="hover:text-white">Terms &amp; Conditions</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h5 className="text-white font-semibold mb-3">Contact Us</h5>
          <p className="text-sm mb-4">123 Farm Lane, AgriTown, GH</p>
          <p className="text-sm mb-4">support@lifestockmart.com</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
          <h6 className="text-white text-lg font-medium mb-4 md:mb-0">
            Join our newsletter
          </h6>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-l bg-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-r hover:bg-green-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} LifeStockMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

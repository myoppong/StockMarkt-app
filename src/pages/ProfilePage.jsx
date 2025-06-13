// src/components/ProfilePage.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="space-y-2">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
      <button
        onClick={logout}
        className="mt-6 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

/**
 * ProtectedRoute restricts access to authenticated users and optionally by role.
 * @param children - the component to render if access is allowed
 * @param roles - optional array of roles allowed (e.g., ['seller'])
 */
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles prop is provided and user's role is not authorized, redirect home
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Authorized, render child components
  return children;
};

export default ProtectedRoute;

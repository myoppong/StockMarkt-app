// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const stored = localStorage.getItem("stockmart_user");
  const [user, setUser] = useState(stored ? JSON.parse(stored) : null);
  const navigate = useNavigate();

  const login = (userData) => {
    localStorage.setItem("stockmart_user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("stockmart_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
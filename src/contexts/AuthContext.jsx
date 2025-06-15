// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const stored = localStorage.getItem("stockmart_auth");
  const [auth, setAuth] = useState(stored ? JSON.parse(stored) : null);
  const navigate = useNavigate();

  // keep axios header in sync
  useEffect(() => {
    if (auth?.token) {
      localStorage.setItem("stockmart_auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("stockmart_auth");
    }
  }, [auth]);

  const signup = async (data) => {
    const res = await registerUser(data);
    setAuth(res.data);
    // navigate("/login");
    
  };

  const login = async (data) => {
    const res = await loginUser(data);
    setAuth(res.data);
    // navigate("/");
    return res;
  };

  const logout = () => {
    setAuth(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";            // correct import
import api from "../services/api.js";
import { loginUser, registerUser } from "../services/auth.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const stored = localStorage.getItem("stockmart_auth");
  const [auth, setAuth] = useState(stored ? JSON.parse(stored) : null);

  // Sync axios header
  useEffect(() => {
    if (auth?.token) api.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    else delete api.defaults.headers.common["Authorization"];
  }, [auth?.token]);

  // Persist to localStorage
  useEffect(() => {
    if (auth) localStorage.setItem("stockmart_auth", JSON.stringify(auth));
    else localStorage.removeItem("stockmart_auth");
  }, [auth]);

  // Auto-logout on token expiry
  useEffect(() => {
    if (!auth?.token) return;
    let timer;
    try {
      const { exp } = jwtDecode(auth.token);
      const ms = exp * 1000 - Date.now();
      if (ms <= 0) logout();
      else timer = setTimeout(logout, ms);
    } catch {
      logout();
    }
    return () => clearTimeout(timer);
  }, [auth?.token]);

  const signup = async (formData) => {
    const res = await registerUser(formData);
    setAuth({ user: res.data.user, token: res.data.token });
    navigate("/");
  };

  const login = async (creds) => {
    const res = await loginUser(creds);
    setAuth({ user: res.data.user, token: res.data.token });
    navigate("/");
    return res;
  };

  const logout = () => {
    setAuth(null);
    navigate("/login");
  };

  // Update basic profile info (phone, city)
  const updateProfile = async (profileData) => {
    const res = await api.put("/me", profileData);
    // assume returns updated user
    setAuth(a => ({ ...a, user: res.data }));
    return res;
  };

  // Change password
  const changePassword = async ({ currentPassword, newPassword }) => {
    const res = await api.put("/me/password", { currentPassword, newPassword });
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        user: auth?.user,
        signup,
        login,
        logout,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

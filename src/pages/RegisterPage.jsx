// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const CITY_OPTIONS = [
  "ACCRA","KUMASI","TAMALE", /* …the other 7 cities, uppercase */
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    username:"", email:"", phone:"",
    password:"", confirmPassword:"",
    role:"CUSTOMER", city:CITY_OPTIONS[0]
  });
  const [error,setError] = useState("");
  const { signup } = useAuth();

  const handleChange = e =>
    setForm(f=>({...f,[e.target.name]:e.target.value}));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(form);
    } catch(err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["username","email","phone","password","confirmPassword"].map(field=>(
            <input
              key={field}
              name={field}
              type={field.includes("password") ? "password":"text"}
              placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:ring-green-500"
            />
          ))}

          {/* Role toggle */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.role==="SELLER"}
              onChange={()=>setForm(f=>({
                ...f, role:f.role==="SELLER"?"CUSTOMER":"SELLER"
              }))}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span>Register as seller</span>
          </label>

          {/* City selector */}
          <div>
            <label className="block mb-1">Your City</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              {CITY_OPTIONS.map(c=>(
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

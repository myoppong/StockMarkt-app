// // src/pages/ProfilePage.jsx
// import React, { useState } from "react";
// import { useAuth } from "../contexts/AuthContext.jsx";

// export default function ProfilePage() {
//   const { user, logout, updateProfile, changePassword } = useAuth();
//   const [editing, setEditing]     = useState(false);
//   const [pwdChanging, setPwdChanging] = useState(false);
//   const [form, setForm]           = useState({
//     phone: user?.phone || "",
//     city:  user?.city  || ""
//   });
//   const [pwdForm, setPwdForm]     = useState({
//     currentPassword: "",
//     newPassword:     "",
//     confirmPassword: ""
//   });
//   const [msg, setMsg]             = useState("");

//   if (!user) return <p>Loading profile…</p>;

//   const handleProfileSubmit = async e => {
//     e.preventDefault();
//     try {
//       await updateProfile(form);
//       setMsg("Profile updated successfully.");
//       setEditing(false);
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Update failed.");
//     }
//   };

//   const handlePasswordSubmit = async e => {
//     e.preventDefault();
//     if (pwdForm.newPassword !== pwdForm.confirmPassword) {
//       return setMsg("New passwords do not match.");
//     }
//     try {
//       await changePassword({
//         currentPassword: pwdForm.currentPassword,
//         newPassword:     pwdForm.newPassword
//       });
//       setMsg("Password changed successfully.");
//       setPwdChanging(false);
//       setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Password change failed.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
//       {msg && <p className="mb-4 text-green-600">{msg}</p>}

//       <div className="space-y-1 mb-6">
//         <p><strong>Username:</strong> {user.username}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role}</p>
//         <p><strong>City:</strong> {user.city}</p>
//         <p><strong>Phone:</strong> {user.phone}</p>
//         <p className="text-sm text-gray-500">
//           Joined {new Date(user.createdAt).toLocaleDateString()}
//         </p>
//       </div>

//       {/* Edit Profile */}
//       {editing ? (
//         <form onSubmit={handleProfileSubmit} className="space-y-4 mb-6">
//           <div>
//             <label className="block mb-1">Phone</label>
//             <input
//               name="phone"
//               value={form.phone}
//               onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
//               className="w-full px-4 py-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block mb-1">City</label>
//             <input
//               name="city"
//               value={form.city}
//               onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
//               className="w-full px-4 py-2 border rounded"
//             />
//           </div>
//           <div className="flex space-x-2">
//             <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//               Save
//             </button>
//             <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-300 rounded">
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <button
//           onClick={() => setEditing(true)}
//           className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Edit Profile
//         </button>
//       )}

//       {/* Change Password */}
//       {pwdChanging ? (
//         <form onSubmit={handlePasswordSubmit} className="space-y-4 mb-6">
//           <div>
//             <label className="block mb-1">Current Password</label>
//             <input
//               type="password"
//               value={pwdForm.currentPassword}
//               onChange={e => setPwdForm(f => ({ ...f, currentPassword: e.target.value }))}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1">New Password</label>
//             <input
//               type="password"
//               value={pwdForm.newPassword}
//               onChange={e => setPwdForm(f => ({ ...f, newPassword: e.target.value }))}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Confirm Password</label>
//             <input
//               type="password"
//               value={pwdForm.confirmPassword}
//               onChange={e => setPwdForm(f => ({ ...f, confirmPassword: e.target.value }))}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="flex space-x-2">
//             <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
//               Change Password
//             </button>
//             <button type="button" onClick={() => setPwdChanging(false)} className="px-4 py-2 bg-gray-300 rounded">
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <button
//           onClick={() => setPwdChanging(true)}
//           className="mb-6 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//         >
//           Change Password
//         </button>
//       )}

//       {/* Logout */}
//       <button
//         onClick={logout}
//         className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }


// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProfilePage() {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const [editing, setEditing] = useState(false);
  const [pwdChanging, setPwdChanging] = useState(false);
  const [form, setForm] = useState({
    phone: user?.phone || "",
    city: user?.city || ""
  });
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [msg, setMsg] = useState("");

  if (!user) return <p className="text-center py-10">Loading profile…</p>;

  const handleProfileSubmit = async e => {
    e.preventDefault();
    try {
      await updateProfile(form);
      setMsg("✅ Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Update failed.");
    }
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      return setMsg("⚠️ New passwords do not match.");
    }
    try {
      await changePassword({
        currentPassword: pwdForm.currentPassword,
        newPassword: pwdForm.newPassword
      });
      setMsg("✅ Password changed successfully.");
      setPwdChanging(false);
      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Password change failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-100 mt-8">
      <h2 className="text-3xl font-extrabold text-green-700 mb-4">👤 Your Profile</h2>

      {msg && (
        <div className="mb-4 p-3 rounded text-sm bg-green-50 text-green-800 border border-green-200">
          {msg}
        </div>
      )}

      <div className="space-y-2 mb-6 text-gray-700 text-base">
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> {user.role}</p>
        <p><span className="font-semibold">City:</span> {user.city}</p>
        <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Edit Profile Form */}
      {editing ? (
        <form onSubmit={handleProfileSubmit} className="space-y-4 mb-6 bg-gray-50 p-4 rounded">
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              name="city"
              value={form.city}
              onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ✏️ Edit Profile
        </button>
      )}

      {/* Change Password Form */}
      {pwdChanging ? (
        <form onSubmit={handlePasswordSubmit} className="space-y-4 mb-6 bg-yellow-50 p-4 rounded">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              value={pwdForm.currentPassword}
              onChange={e => setPwdForm(f => ({ ...f, currentPassword: e.target.value }))}
              className="w-full px-4 py-2 border rounded focus:ring-yellow-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              value={pwdForm.newPassword}
              onChange={e => setPwdForm(f => ({ ...f, newPassword: e.target.value }))}
              className="w-full px-4 py-2 border rounded focus:ring-yellow-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={pwdForm.confirmPassword}
              onChange={e => setPwdForm(f => ({ ...f, confirmPassword: e.target.value }))}
              className="w-full px-4 py-2 border rounded focus:ring-yellow-300"
              required
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Change Password
            </button>
            <button type="button" onClick={() => setPwdChanging(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setPwdChanging(true)}
          className="mb-6 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          🔒 Change Password
        </button>
      )}

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full py-3 px-4 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        🚪 Logout
      </button>
    </div>
  );
}

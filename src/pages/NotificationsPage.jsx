// src/components/NotificationsPage.jsx
import React, { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Fetch notifications
    setNotifications([
      { id: 1, message: "Your order #1 has been shipped." },
      { id: 2, message: "New product available: Healthy Sheep!" },
    ]);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map(note => (
            <li key={note.id} className="bg-white p-3 rounded shadow">{note.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
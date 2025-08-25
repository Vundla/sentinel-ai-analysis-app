import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Notifications</h2>
      {loading ? <div>Loading...</div> : (
        <ul>
          {notifications.map(n => (
            <li key={n.id} style={{ fontWeight: n.is_read ? 'normal' : 'bold' }}>
              {n.message} <span className="text-muted">({n.created_at})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

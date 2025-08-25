import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const usersRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(usersRes.data);
        const logsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/audit-logs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(logsRes.data);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      {loading ? <div>Loading...</div> : (
        <>
          <h4>Users</h4>
          <ul>
            {users.map(u => <li key={u.id}>{u.username} ({u.email})</li>)}
          </ul>
          <h4 className="mt-4">Audit Logs</h4>
          <ul>
            {logs.map(l => <li key={l.id}>{l.action} - {l.details} ({l.created_at})</li>)}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

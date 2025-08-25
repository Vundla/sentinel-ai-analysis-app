
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Register = () => {
  const [form, setForm] = useState({
    fullname: '',
    surname: '',
    email: '',
    cellphone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      setSuccess('Registration successful! You can now log in.');
      setForm({ fullname: '', surname: '', email: '', cellphone: '', password: '', confirmPassword: '' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 500 }}>
      <div className="card p-4">
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" name="fullname" className="form-control" value={form.fullname} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Surname</label>
            <input type="text" name="surname" className="form-control" value={form.surname} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Cellphone</label>
            <input type="text" name="cellphone" className="form-control" value={form.cellphone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" value={form.confirmPassword} onChange={handleChange} required />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

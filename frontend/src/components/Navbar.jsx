import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', backdropFilter: 'blur(10px)' }}>
    <div className="container-fluid">
      <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ color: 'var(--accent-violet)', fontWeight: 'bold' }}>
        <FiShield className="me-2" />
        Sentinel
      </NavLink>
      <div className="navbar-nav">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/submit">Submit Report</NavLink>
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
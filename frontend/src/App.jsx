import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const SubmitReport = lazy(() => import('./pages/SubmitReport'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Notifications = lazy(() => import('./pages/Notifications'));

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If not already on login or register, redirect to login
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<Spinner />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitReport />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default App;
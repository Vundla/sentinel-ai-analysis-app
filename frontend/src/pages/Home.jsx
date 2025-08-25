import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiBarChart2, FiAlertTriangle } from 'react-icons/fi';

const features = [
  { icon: <FiAlertTriangle size={30} />, title: "Real-Time Threat Reporting", description: "Submit incidents of cyberbullying or threats as they happen." },
  { icon: <FiShield size={30} />, title: "AI-Powered Analysis", description: "Our advanced AI analyzes reports to determine severity and intent." },
  { icon: <FiBarChart2 size={30} />, title: "Actionable Insights", description: "Moderators get clear, actionable suggestions for every case." }
];

const Home = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container text-center my-5">
    <motion.h1 
      initial={{ y: -50 }} animate={{ y: 0 }}
      className="display-3 fw-bold mb-3" 
      style={{ color: 'var(--accent-violet)' }}
    >
      Sentinel AI
    </motion.h1>
    <p className="lead mb-5" style={{ color: 'var(--text-secondary)' }}>
      Proactive Cybersecurity & Community Moderation for a Safer Digital World.
    </p>
    <div className="row mb-5">
      {features.map((feature, index) => (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * index }}
          className="col-md-4" key={index}
        >
          <div className="card p-4 h-100">
            <div style={{ color: 'var(--accent-ruby)' }}>{feature.icon}</div>
            <h4 className="mt-3">{feature.title}</h4>
            <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <Link to="/submit" className="btn btn-primary btn-lg">
      Submit a Confidential Report
    </Link>
  </motion.div>
);

export default Home;

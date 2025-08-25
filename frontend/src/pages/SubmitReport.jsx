import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SubmitReport = () => {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setStatus({ msg: 'Report content cannot be empty.', type: 'danger' });
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/reports`, { content });
      setStatus({ msg: 'Report submitted successfully. A moderator will review it shortly.', type: 'success' });
      setContent('');
    } catch (err) {
      setStatus({ msg: 'Failed to submit report. Please try again later.', type: 'danger' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container my-5" style={{ maxWidth: '700px' }}>
      <div className="card p-4 p-md-5">
        <h2 className="text-center mb-4">Submit a Confidential Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide all relevant details, including links, usernames, and a description of the incident..."
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Securely'}
          </button>
        </form>
        {status.msg && (
          <div className={`alert alert-${status.type} mt-4`}>{status.msg}</div>
        )}
      </div>
    </motion.div>
  );
};

export default SubmitReport;
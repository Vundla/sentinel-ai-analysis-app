import { useState, useEffect } from 'react';
import axios from 'axios';

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [analytics, setAnalytics] = useState({
    total: 0,
    new: 0,
    analyzing: 0,
    pending: 0,
    reviewed: 0,
    actioned: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/reports');
      setReports(res.data.reports);
      setAnalytics(res.data.analytics);
      setLoading(false);
    } catch (err) {
      setError('Failed to load reports');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Trigger AI analysis
  const analyzeReport = async (report) => {
    try {
      // Set status to 'pending' immediately
      setReports(prev =>
        prev.map(r => r.id === report.id ? { ...r, status: 'pending' } : r)
      );

      // After 5 seconds, if still not reviewed, set to 'reviewed'
      setTimeout(() => {
        setReports(prev =>
          prev.map(r =>
            r.id === report.id && r.status !== 'reviewed'
              ? { ...r, status: 'reviewed' }
              : r
          )
        );
      }, 5000);

      // Start analysis (will update to reviewed when done)
      const res = await axios.post(`http://localhost:5000/api/reports/${report.id}/analyze`);

      // Update report with AI feedback and new status
      setReports(prev =>
        prev.map(r =>
          r.id === report.id
            ? { ...r, status: res.data.status, ai_feedback: res.data.ai_feedback }
            : r
        )
      );
    } catch (err) {
      setError('AI Analysis failed');
      // revert spinner if failed
      setReports(prev =>
        prev.map(r => r.id === report.id ? { ...r, status: 'new' } : r)
      );
    }
  };

  // Delete report
  const deleteReport = async (reportId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/${reportId}`);
      setReports(prev => prev.filter(r => r.id !== reportId));
    } catch (err) {
      setError('Failed to delete report');
    }
  };

  return { reports, analytics, loading, error, analyzeReport, deleteReport, fetchReports };
};
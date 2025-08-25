import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useReports } from '../hooks/useReports';
import StatCard from '../components/StatCard';
import ReportModal from '../components/ReportModal';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { reports, analytics, loading, error, analyzeReport } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [loadingReportId, setLoadingReportId] = useState(null);

  if (loading) return <Spinner />;
  if (error) return <div className="container mt-5 text-center text-danger">{error}</div>;

  const chartData = [
    { name: 'New', count: analytics.new || 0 },
    { name: 'Analyzing', count: analytics.analyzing || 0 },
    { name: 'Pending', count: analytics.pending || 0 },
    { name: 'Reviewed', count: analytics.reviewed || 0 },
    { name: 'Actioned', count: analytics.actioned || 0 },
  ];

  const handleAnalyze = async (report) => {
    try {
      setLoadingReportId(report.id);
      await analyzeReport(report);
    } finally {
      setLoadingReportId(null);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="h2 mb-4">Moderator Dashboard</h1>
      <div className="row mb-4">
        <StatCard title="Total Reports" value={analytics.total} />
        <StatCard title="New" value={analytics.new} />
        <StatCard title="Analyzing" value={analytics.analyzing} />
        <StatCard title="Pending" value={analytics.pending} />
        <StatCard title="Reviewed" value={analytics.reviewed} />
        <StatCard title="Actioned" value={analytics.actioned} />
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card p-3">
            <h5 className="card-title">Recent Reports</h5>
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>ID</th><th>Status</th><th>Content</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">No reports found.</td>
                    </tr>
                  )}
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>
                        <span className={`badge bg-${
                          report.status === 'new' ? 'info' :
                          report.status === 'analyzing' ? 'warning' :
                          report.status === 'pending' ? 'secondary' :
                          report.status === 'reviewed' ? 'success' :
                          'dark'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td>{report.content.substring(0, 50)}...</td>
                      <td>
                        <button className="btn btn-sm btn-outline-light me-2" onClick={() => setSelectedReport(report)}>View</button>
                        <button
                          className="btn btn-sm btn-danger me-2"
                          onClick={() => deleteReport(report.id)}
                        >Delete</button>
                        {(report.status !== 'reviewed' && report.status !== 'analyzing') && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleAnalyze(report)}
                            disabled={loadingReportId === report.id}
                          >
                            {loadingReportId === report.id ? (
                              <span className="spinner-border spinner-border-sm" role="status"></span>
                            ) : 'Analyze'}
                          </button>
                        )}
                        {report.status === 'analyzing' && <div className="spinner-border spinner-border-sm" role="status"></div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="card-title">Report Status</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }} />
                <Bar dataKey="count" fill="var(--accent-violet)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  );
};

export default Dashboard;

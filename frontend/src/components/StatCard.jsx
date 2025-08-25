import React from 'react';

const StatCard = ({ title, value }) => (
  <div className="col-md-4 mb-3">
    <div className="card p-3 text-center">
      <h6 className="text-uppercase" style={{ color: 'var(--text-secondary)' }}>{title}</h6>
      <p className="h1 fw-bold" style={{ color: 'var(--accent-ruby)' }}>{value}</p>
    </div>
  </div>
);
export default StatCard;
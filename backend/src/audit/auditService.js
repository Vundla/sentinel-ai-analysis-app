// auditService.js
// Handles creation and retrieval of audit logs for compliance and traceability.

const db = require('../db');

module.exports = {
  logAction: async (userId, action, details) => {
    await db.query(
      'INSERT INTO audit_logs (user_id, action, details) VALUES (?, ?, ?)',
      [userId, action, details]
    );
  },
  getLogs: async () => {
    const [rows] = await db.query('SELECT * FROM audit_logs ORDER BY created_at DESC');
    return rows;
  }
};

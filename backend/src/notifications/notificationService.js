// notificationService.js
// Handles sending notifications to users (email, push, in-app, etc.)

const db = require('../db');

module.exports = {
  sendNotification: async (userId, message) => {
    await db.query(
      'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
      [userId, message]
    );
  },
  getUserNotifications: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }
};

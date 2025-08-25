const express = require('express');
const router = express.Router();
const notificationService = require('./notificationService');

// Get notifications for the current user (assumes user ID is in req.user.id)
router.get('/', async (req, res) => {
  // In a real app, extract user ID from JWT or session
  const userId = req.user?.id || 1; // TODO: Replace with real auth
  try {
    const notifications = await notificationService.getUserNotifications(userId);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

module.exports = router;

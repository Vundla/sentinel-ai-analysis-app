const express = require('express');
const router = express.Router();
const adminController = require('./adminController');

// Admin dashboard
router.get('/dashboard', adminController.getDashboard);

// List all users
router.get('/users', adminController.listUsers);

// View audit logs
router.get('/audit-logs', adminController.viewAuditLogs);

module.exports = router;

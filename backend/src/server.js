const express = require('express');
const cors = require('cors');
require('dotenv').config();

const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('../src/admin/adminRoutes');
const notificationRoutes = require('../src/notifications/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins for development
app.use(express.json());

// API Routes
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ God-level backend is running on http://localhost:${PORT}`);
});

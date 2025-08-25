const express = require('express');
const router = express.Router();
const authService = require('./authService');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await authService.register(username, email, password);
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await authService.login(username, password);
    if (!result) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ user: result.user, token: result.token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;

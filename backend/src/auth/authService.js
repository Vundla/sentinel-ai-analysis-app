// authService.js
// Handles authentication, registration, and JWT token management.

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'supersecret';

module.exports = {
  register: async (username, email, password) => {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );
  },
  login: async (username, password) => {
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!users.length) return null;
    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return null;
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1d' });
    return { user, token };
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, SECRET);
    } catch {
      return null;
    }
  }
};

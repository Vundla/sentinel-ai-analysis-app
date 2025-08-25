// backend/scripts/resetTestUserPasswords.js
const db = require('../src/db');
const bcrypt = require('bcryptjs');

async function reset() {
  try {
    const [rows] = await db.query("SELECT id, email FROM users WHERE email LIKE 'testuser%.sentinel.test@gmail.com'");
    for (let i = 0; i < rows.length; i++) {
      const { email } = rows[i];
      const hash = await bcrypt.hash('Password1', 10);
      await db.query('UPDATE users SET password_hash = ? WHERE email = ?', [hash, email]);
      console.log('Updated', email);
    }
    console.log('All updated.');
  } catch (err) {
    console.error(err);
  } finally {
    try { await db.end(); } catch (e) {}
  }
}
reset();

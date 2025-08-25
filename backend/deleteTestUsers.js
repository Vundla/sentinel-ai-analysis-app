const pool = require('./src/db');

(async () => {
  try {
    const [res] = await pool.query("DELETE FROM users WHERE email LIKE 'testuser%.sentinel.test@gmail.com'");
    console.log('Deleted rows:', res.affectedRows);
    process.exit(0);
  } catch (err) {
    console.error('Delete error:', err.message || err);
    process.exit(1);
  }
})();

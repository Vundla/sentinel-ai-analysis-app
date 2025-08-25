const pool = require('./src/db');

(async () => {
  try {
    const [countRows] = await pool.query("SELECT COUNT(*) AS cnt FROM users WHERE email LIKE 'testuser%.sentinel.test@gmail.com'");
    console.log('Found test users count:', countRows[0].cnt);

    const [rows] = await pool.query("SELECT id, fullname, email, cellphone FROM users WHERE email LIKE 'testuser%.sentinel.test@gmail.com' ORDER BY id DESC LIMIT 10");
    console.log('Sample rows:');
    rows.forEach(r => console.log(r));
    process.exit(0);
  } catch (err) {
    console.error('DB check error:', err.message || err);
    process.exit(1);
  }
})();

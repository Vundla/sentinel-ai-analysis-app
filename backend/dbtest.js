const pool = require('./src/db');

async function test() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('DB OK:', rows[0].solution);
    process.exit(0);
  } catch (err) {
    console.error('DB ERROR:', err.message || err);
    process.exit(1);
  }
}

test();

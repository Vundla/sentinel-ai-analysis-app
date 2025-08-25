const pool = require('./src/db');
const bcrypt = require('bcryptjs');

// Configuration
const NUM_USERS = parseInt(process.argv[2], 10) || 10; // default 10 users
const PASSWORD_BASE = 'TestPass!'; // will append index

async function run() {
  try {
    const users = [];
    const credentials = [];

    for (let i = 1; i <= NUM_USERS; i++) {
      const fullname = `TestUser${i}`;
      const surname = `User${i}`;
      const email = `testuser${i}.sentinel.test@gmail.com`;
      const cellphone = `082${String(1000000 + i).slice(-7)}`;
      const password = `${PASSWORD_BASE}${i}`;
      const password_hash = await bcrypt.hash(password, 10);

      users.push([fullname, surname, email, cellphone, password_hash]);
      credentials.push({ email, password });
    }

    const sql = `INSERT INTO users (fullname, surname, email, cellphone, password_hash) VALUES ?`;
    const [result] = await pool.query(sql, [users]);
    console.log(`Inserted ${NUM_USERS} users. InsertId: ${result.insertId}`);

    console.log('Sample credentials (first 10):');
    credentials.slice(0, 10).forEach((c, idx) => {
      console.log(`${idx + 1}. ${c.email} / ${c.password}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error inserting users:', err.message || err);
    process.exit(1);
  }
}

run();

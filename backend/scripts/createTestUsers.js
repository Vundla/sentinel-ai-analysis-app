#!/usr/bin/env node
const path = require('path');
const db = require('../src/db');
const bcrypt = require('bcryptjs');

async function createTestUsers(count = 100) {
  console.log(`Creating up to ${count} test users...`);
  try {
    for (let i = 1; i <= count; i++) {
      const email = `testuser${i}.sentinel.test@gmail.com`;
      const fullname = `Test User ${i}`;
      const surname = `Tester`;
      const cellphone = null;
      const password = `Password${i}`; // simple predictable password for tests

      // skip if already exists
      const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        console.log(`Skipped (exists): ${email}`);
        continue;
      }

      const hash = await bcrypt.hash(password, 10);
      await db.query(
        'INSERT INTO users (fullname, surname, email, cellphone, password_hash) VALUES (?, ?, ?, ?, ?)',
        [fullname, surname, email, cellphone, hash]
      );

      console.log(`Created: ${email} / ${password}`);
    }

    console.log('Done creating test users.');
  } catch (err) {
    console.error('Error creating test users:', err.message || err);
    process.exitCode = 1;
  } finally {
    // close pool
    try { await db.end(); } catch (e) {}
  }
}

const arg = process.argv[2] ? parseInt(process.argv[2], 10) : 100;
createTestUsers(isNaN(arg) ? 100 : arg);

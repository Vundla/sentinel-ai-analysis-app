const axios = require('axios');

async function attempt(i) {
  const email = `testuser${i}.sentinel.test@gmail.com`;
  const password = `TestPass!${i}`;

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { timeout: 5000 });
    console.log(`${i}: SUCCESS`, res.data.message || res.data);
  } catch (err) {
    if (err.response) console.log(`${i}: FAIL ${err.response.status}`, err.response.data);
    else console.log(`${i}: ERROR`, err.message || err);
  }
}

(async () => {
  for (let i = 1; i <= 5; i++) {
    await attempt(i);
  }
})();

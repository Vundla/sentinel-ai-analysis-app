const axios = require('axios');

(async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'testuser1.sentinel.test@gmail.com',
      password: 'TestPass!1'
    });
    console.log('Login response:', res.data);
  } catch (err) {
    if (err.response) console.error('Login failed:', err.response.status, err.response.data);
    else console.error(err.message || err);
  }
})();

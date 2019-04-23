const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Selamat Datang di Express');
});

module.exports = router;

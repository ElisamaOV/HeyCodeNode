const express = require('express');
const path = require('path');
const router = express.Router();

//https://localhost:4000/
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

module.exports = router;

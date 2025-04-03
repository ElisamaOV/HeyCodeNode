const express = require('express');
const path = require('path');
const uploadFile = require('../../11_Pasteleria/middleware/uploadFile');
const router = express.Router();

router.post('/', uploadFile('users'), (req, res) => {
  res.sendFile(path.join(__dirname, '../html/comment.html'));
  console.log(req.body);
});

// app.post('/comment', (req, res) => {
//   res.sendFile(__dirname + '/html/comment.html');
//   console.log(req.body);
// });

module.exports = router;

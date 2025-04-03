const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middleware/uploadFile');
//http://localhost:4000/users/getAllUsers

router.get('/getAllusers', (req, res) => {
  res.send('lista de todos los users');
});

//http://localhost:4000/users/register
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/formRegistro.html'));
});

//http://localhost:4000/users/register
router.post('/UserRegister', upload('users'), (req, res) => {
  res.send('post datos ok');
});
module.exports = router;

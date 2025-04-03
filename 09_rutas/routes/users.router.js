const express = require('express');
const path = require('path');
const router = express.Router();

//http:localhost/4000/users/getAllUsers
router.get('/getAllUsers', (req, res) => {
  res.send('Lista de todos los usuarios');
});

//http:localhost/4000/users/register
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/formRegistro.html'));
});

//http:localhost/4000/users/register
router.post('/register', (req, res) => {
  res.send('post datos ok');
});

module.exports = router;

const express = require('express');
const path = require('path');
const uploadFile = require('../../10_uploadFilesMulter/middleware/uploadFile');
const router = express.Router();

//https://localhost:4000/users/createUser
router.get('/createUser', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/createUser.html'));
});
//Recibir los datos de la pizza que queriamos del formulario
router.post('/createUser', uploadFile('users'), (req, res) => {
  res.sendFile(path.join(__dirname, '../html/createUserConfirm.html'));
  console.log(req.body);
});

module.exports = router;

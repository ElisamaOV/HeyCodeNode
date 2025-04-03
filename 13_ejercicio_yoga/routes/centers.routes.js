const express = require('express');
const connection = require('../config/db');
const uploadFile = require('../middleware/uploadFile');
var router = express.Router();
// const connection = require('../config/db');
// const uploadFile = require('../middleware/uploadFile');

router.get('/', (req, res) => {
  let sql = 'SELECT * FROM center';

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.render('centers', {
        centers: result,
      });
    }
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', uploadFile('centers'), (req, res) => {
  console.log('REQBODYYYYYYYY', req.body);
  const { name, address, city, province, email, web_page } = req.body;
  let sql =
    'INSERT INTO center (name, address, city, province, email, web_page) VALUES (?,?,?,?,?,?)';
  let values = [name, address, city, province, email, web_page];

  if (req.file != undefined) {
    sql =
      'INSERT INTO center (name, address, city, province, email, web_page, center_img) VALUES (?,?,?,?,?,?,?)';
    values = [
      name,
      address,
      city,
      province,
      email,
      web_page,
      req.file.filename,
    ];
  }

  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/centers');
    }
  });
});

module.exports = router;

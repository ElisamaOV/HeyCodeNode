var express = require('express');
var router = express.Router();
const connection = require('../config/db');

/* GET home page. */
//http://localhost:4000/

router.get('/', (req, res) => {
  //llamar a la base de datos para traer datos que queremos pintar
  let sql = 'SELECT * FROM pet where pet_is_del = 0;';

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'home',
        mascotas: result,
      });
    }
  });
});

module.exports = router;

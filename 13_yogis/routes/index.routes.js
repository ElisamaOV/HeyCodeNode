var express = require('express');
var router = express.Router();
const conntection = require('../config/db');
/* GET home page. */
router.get('/', function (req, res, next) {
  //pedir la lista de todos los trainers para luego mandarla a la vista index.ejs para pintarla
  let sql = 'select * from trainer where trainer_is_del = 0';
  conntection.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log('***********', result);

      res.render('index', { result });
    }
  });
});

module.exports = router;

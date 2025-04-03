var express = require('express');
const connection = require('../config/db');
var router = express.Router();

//http://localhost:3000/trainers/oneTrainer/4
router.get('/oneTrainer/:id', function (req, res) {
  const { id } = req.params;

  let sql = 'SELECT * FROM trainer WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.render('oneTrainer', { trainer: result[0] });
    }
  });
});

module.exports = router;

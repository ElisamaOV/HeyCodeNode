var express = require('express');
var router = express.Router();
const connection = require('../config/db');
const uploadFile = require('../middleware/uploadFile');

/* GET users listing. */
//http://localhost:4000/trainers/oneTrainer/67
router.get('/oneTrainer/:id', (req, res) => {
  const { id } = req.params;
  let sql = 'select * from trainer where trainer_id = ? and trainer_is_del = 0';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      // console.log("---------------------",result);

      res.render('oneTrainer', { yogi: result[0] });
    }
  });
});

//localhost:4000/trainers/registerTrainer
router.post('/registerTrainer', uploadFile('trainers'), (req, res) => {
  const { nombre, apellidos, email } = req.body;

  if (!nombre || !apellidos || !email) {
    let sql = 'select * from trainer where trainer_is_del = 0';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('index.ejs', { result, message: 'Algun campo está vacio' });
      }
    });
  } else {
    let sql = 'insert into trainer (name, lastname, email) values (?,?,?)';
    let values = [nombre, apellidos, email];

    if (req.file != undefined) {
      sql =
        'insert into trainer (name, lastname, email, avatar_img) values (?,?,?,?)';
      let foto = req.file.filename;
      values = [nombre, apellidos, email, foto];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  }
});

router.get('/editTrainer/:id', (req, res) => {
  const { id } = req.params;

  let sql = 'select * from trainer where trainer_id = ? and trainer_is_del = 0';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.render('formEditTrainer', { result: result[0] });
    }
  });
});

router.post('/editTrainer/:id', uploadFile('trainers'), (req, res) => {
  const { id } = req.params;
  const { name, lastname, email } = req.body;
  //AQUI HARÍA FALTA UNA VALIDACION
  let sql =
    'UPDATE trainer SET name = ?, lastname = ?, email = ? where trainer_id = ? and trainer_is_del = 0';
  let values = [name, lastname, email, id];

  if (req.file) {
    sql =
      'UPDATE trainer SET name = ?, lastname = ?, email = ?, avatar_img = ? where trainer_id = ? and trainer_is_del = 0';
    values = [name, lastname, email, req.file.filename, id];
  }

  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect(`/trainers/oneTrainer/${id}`);
    }
  });
});

//PARA BORRAR ES UN GET
router.get('/totalElimination/:id', (req, res) => {
  const { id } = req.params;
  let sql = 'delete from trainer where trainer_id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

router.get('/logicalElimination/:id', (req, res) => {
  const { id } = req.params;

  let sql = 'update trainer set trainer_is_del = 1 where trainer_id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;

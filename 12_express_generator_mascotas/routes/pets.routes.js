const express = require('express');
const uploadFile = require('../middleware/uploadFile');
const connection = require('../config/db');
const router = express.Router();
//entrada a este grupo de rutas es:
//localhost:4000/pets

//muestar el formulario
router.get('/createPet', (req, res) => {
  res.render('newPet', { title: 'Formulario Creacion de mascotas' });
});
// recoge los datos del formulario para generar una nueva mascota en bd
router.post('/newPet', uploadFile('petsImgs'), (req, res) => {
  console.log('FOTOOOOOOOOOOOOO', req.file);
  const { nombre, especie, raza } = req.body;
  let sql = 'INSERT INTO pet (name, specie, breed) VALUES (?,?,?)';
  let values = [nombre, especie, raza];

  //guardar la mascota con sql parametrizadas

  if (req.file != undefined) {
    sql = 'INSERT INTO pet (name, specie, breed, pet_img) VALUES (?,?,?,?)';
    values = [nombre, especie, raza, req.file.filename];
  }

  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

//http://localhost:4000/pets/onePet/
router.get('/onePet/:id', (req, res) => {
  const { id } = req.params;

  let sql = 'SELECT * FROM pet WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.render('onePet', { title: 'Info de una mascota', perro: result[0] });
    }
  });
});

router.get('/editPet/:id', (req, res) => {
  const { id } = req.params;

  let sql = 'select * from pet where id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.render('editPet', { perro: result[0] });
    }
  });
});

router.post('/editPet/:id', uploadFile('petsImgs'), (req, res) => {
  const { id } = req.params;
  const { name, specie, breed } = req.body;
  let sql = 'UPDATE pet SET name = ?, specie = ?, breed = ? WHERE id = ?';
  let values = [name, specie, breed, id];

  if (req.file) {
    sql =
      'UPDATE pet SET name = ?, specie = ?, breed = ?, pet_img = ? WHERE id = ?';
    values = [name, specie, breed, req.file.filename, id];
  }

  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

router.get('/totalElimination/:id', (req, res) => {
  const { id } = req.params;

  let sql = 'delete from pet where id = ?';
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
  let sql = 'update pet set pet_is_del = 1 where id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;

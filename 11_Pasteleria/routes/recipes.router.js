const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/pasteles', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/pasteles.html'));
});

router.get('/tartas', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/tartas.html'));
});

router.get('/galletas', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/galletas.html'));
});

router.get('/postres', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/postres.html'));
});

router.get('/tartas/:idTarta', (req, res) => {
  let id = req.params.idTarta;
  res.send(`Estamos en ${id}`);
});

module.exports = router;

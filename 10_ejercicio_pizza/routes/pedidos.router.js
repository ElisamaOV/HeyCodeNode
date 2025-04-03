const express = require('express');
const path = require('path');
const router = express.Router();

//https://localhost:4000/pedidos
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/pedidos.html'));
});
//Recibir los datos de la pizza que queriamos del formulario
router.post('/createPedido', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/createPedido.html'));
  console.log(req.body);
});

module.exports = router;

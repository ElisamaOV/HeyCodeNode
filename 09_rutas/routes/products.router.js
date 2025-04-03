const express = require('express');
const router = express.Router();

//http:localhost/4000/productos
router.get('/', (req, res) => {
  res.send('Todos los productos');
});

//http:localhost/4000/productos/oneProduct/15 (ejemplo de chucheria 15)
router.get('/oneProduct/:id', (req, res) => {
  //param id
  //pido db el 15
  res.send('informacion del producto 15');
});

module.exports = router;

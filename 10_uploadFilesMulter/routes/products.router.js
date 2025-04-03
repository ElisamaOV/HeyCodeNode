const express = require('express');
const router = express.Router();

//http://localhost:4000/productos
router.get('/', (req, res)=>{
    res.send("todos los productos")
})

//http://localhost:4000/productos/oneProduct/15
router.get('/oneProduct/:id', (req, res)=>{
    //params id
    //pido db el 17

    res.send("información del producto 17")
})
module.exports = router;
18
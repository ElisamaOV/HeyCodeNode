const express = require('express');
const router = express.Router();

//http://localhost:4000/centers/
router.get('/', (req, res)=>{
    res.send("cista de todos los ventros")
})

module.exports = router;
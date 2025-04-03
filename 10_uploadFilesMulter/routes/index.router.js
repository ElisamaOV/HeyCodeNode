const express = require('express');
const path = require('path');
const router = express.Router();

console.log(__dirname + "../html/index.html");

//http://localhost:4000/
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "../html/index.html"))
})

//http://localhost:4000/about
router.get('/about', (req, res)=>{
    res.send("<h1>about</h1>")
} )

module.exports = router;











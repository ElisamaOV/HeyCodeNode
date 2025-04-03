var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

//http://localhost:4000/
router.get('/', indexController.showHome);
router.get('/about', indexController.showAbout);

module.exports = router;

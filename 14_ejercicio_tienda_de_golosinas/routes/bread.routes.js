var express = require('express');
var router = express.Router();
const uploadFile = require('../middleware/uploadFile');
const breadController = require('../controllers/breadController');

router.get('/', breadController.showBread);
router.get('/oneBread/:id', breadController.showOneBread);
router.get('/deleteTotal/:id', breadController.deleteTotal);
router.get('/deleteLogical/:id', breadController.deleteLogical);
router.get('/editBread/:id', breadController.editBreadGet);
router.post(
  '/editBread/:id',
  uploadFile('bread'),
  breadController.editBreadPost
);
module.exports = router;

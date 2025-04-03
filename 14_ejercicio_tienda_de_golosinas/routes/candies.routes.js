var express = require('express');
var router = express.Router();
const uploadFile = require('../middleware/uploadFile');
const candiesController = require('../controllers/candiesController');

router.get('/', candiesController.showCandies);
router.get('/candy/:id', candiesController.showCandy);
router.get('/deleteTotal/:id', candiesController.deleteTotal);
router.get('/deleteLogical/:id', candiesController.deleteLogical);
router.get('/editCandy/:id', candiesController.editCandyGet);
router.post(
  '/editCandy/:id',
  uploadFile('candies'),
  candiesController.editCandyPost
);
module.exports = router;

var express = require('express');
var router = express.Router();
const chipsController = require('../controllers/chipsController');
const uploadFile = require('../middleware/uploadFile');

router.get('/', chipsController.showChips);
router.get('/chip/:id', chipsController.showChip);
router.get('/deleteTotal/:id', chipsController.deleteTotal);
router.get('/deleteLogical/:id', chipsController.deleteLogical);
router.get('/editChip/:id', chipsController.editChipGet);
router.post('/editChip/:id', uploadFile('chips'), chipsController.editChipPost);
module.exports = router;

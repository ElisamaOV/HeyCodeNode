var express = require('express');
var router = express.Router();
const designerController = require('../controllers/designerController');
const uploadFile = require('../middleware/uploadFile');
/* GET users listing. */
router.get('/createDesigner', designerController.showCreateDesignerForm);
router.post(
  '/createDesigner',
  uploadFile('designers'),
  designerController.createDesigner
);

module.exports = router;

var express = require('express');
var router = express.Router();
const designsControllers = require('../controllers/designsController');
const uploadFile = require('../middleware/uploadFile');
/* GET users listing. */
router.get('/createDesign/:id', designsControllers.showCreateDesignForm);
router.post(
  '/createDesign/:id',
  uploadFile('designs'),
  designsControllers.createDesign
);
router.get('/showDesign/:id', designsControllers.showDesign);
router.get('/editDesign/:id', designsControllers.editDesignGet);
router.post(
  '/editDesign/:id',
  uploadFile('designs'),
  designsControllers.editDesignPost
);

module.exports = router;

var express = require('express');
const directorController = require('../controllers/directorController');
const uploadFile = require('../middleware/uploadFile');
var router = express.Router();

/* GET users listing. */
router.get('/list', directorController.directorList);
router.get('/registerForm', directorController.showRegisterForm);
router.post('/register', directorController.register);
router.get('/loginForm', directorController.showLogin);
router.post('/login', directorController.login);
router.get('/profile/:id', directorController.profile);
router.get('/editDirectorForm/:id', directorController.showEditDirectorForm);
router.post(
  '/editDirector/:id',
  uploadFile('directors'),
  directorController.editDirector
);
router.get('/delLogicDirector/:id', directorController.delLogic);
router.get('/delTotalDirector/:id', directorController.delTotal);

module.exports = router;

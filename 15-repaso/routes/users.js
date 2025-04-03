var express = require('express');
const userControllers = require('../controllers/userControllers');
var router = express.Router();

/* GET users listing. */
router.get('/registerForm', userControllers.showRegisterForm);
router.get('/list', userControllers.listaUsers);
router.get('/showOneUser/:id', userControllers.showOneUser);
router.post('/register', userControllers.register);
router.get('/loginForm', userControllers.showLogin);
router.post('/login', userControllers.login);
router.get('/showEditForm/:id', userControllers.showEditForm)
router.post('/edit/:id', userControllers.edit);
router.get('/profile/:id', userControllers.profile)




module.exports = router;

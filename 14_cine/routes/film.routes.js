var express = require('express');
const filmsController = require('../controllers/filmsController');
const uploadFile = require('../middleware/uploadFile');
var router = express.Router();

router.post(
  '/createFilm/:director_id',
  uploadFile('films'),
  filmsController.createfilm
);

router.get('/filmProfile/:id', filmsController.profile);
router.get('/createFilmSelectForm', filmsController.showFormCreateFilm);
router.post(
  '/createFilmSelect',
  uploadFile('films'),
  filmsController.createFilmSelect
);
router.get('/allFilms', filmsController.allFilms);
router.get('/editFilm/:id', filmsController.showEditFilm);
router.post('/editFilm/:id', filmsController.editFilm);
module.exports = router;

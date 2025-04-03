const connection = require('../config/db');
class FilmsController {
  createfilm = (req, res) => {
    const { director_id } = req.params;
    const { title, release_year } = req.body;

    let sql =
      'Insert into film (id_director, title, release_year) values (?, ?, ?)';
    let values = [director_id, title, release_year];

    if (req.file) {
      sql =
        'Insert into film (id_director, title, release_year, film_img) values (?, ?, ?, ?)';
      values = [director_id, title, release_year, req.file.filename];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/director/profile/${director_id}`);
      }
    });
  };

  profile = (req, res) => {
    const { id } = req.params;

    let sql = 'select * from film where id_film = ? and film_is_deleted = 0';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('filmProfile', { result: result[0] });
      }
    });
  };

  showFormCreateFilm = (req, res) => {
    let sql =
      'select id_director, name, lastname from director where director_is_deleted = 0';

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.render('formCreateFilmSelect', { result });
      }
    });
  };

  createFilmSelect = (req, res) => {
    console.log('BOOOOOOOOOOOOOOOOOOOOOODY', req.body);
    console.log('FIIIIIIIIIIIIIIIIIILEEEEE', req.file);
    const { title, release_year, id_director } = req.body;

    let sql =
      'insert into film (title, release_year, id_director) values (?,?,?)';
    let values = [title, release_year, id_director];

    if (req.file) {
      sql =
        'insert into film (title, release_year, id_director, film_img) values (?,?,?,?)';
      values = [title, release_year, id_director, req.file.filename];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };

  allFilms = (req, res) => {
    let sql = 'select * from film where film_is_deleted = 0';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('allFilms', { result });
      }
    });
  };

  showEditFilm = (req, res) => {
    res.render('formEditFilm');
  };

  editFilm = (req, res) => {
    res.send('Hola');
  };
}
module.exports = new FilmsController();

//REQUERIMIENTOS
const connection = require('../config/db');
const bcrypt = require('bcrypt');

class DirectorController {
  directorList = (req, res) => {
    let sql = 'select * from director where director_is_deleted = 0';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.render('directorList', { result });
      }
    });
  };

  showRegisterForm = (req, res) => {
    res.render('register', { message: '' });
  };

  register = (req, res) => {
    const { name, lastname, email, password, repPassword } = req.body;

    if (!name || !lastname || !password || !repPassword) {
      res.render('register', { message: 'Algun campo está incompleto' });
    } else {
      if (password !== repPassword) {
        res.render('register', { message: 'Las contraseñas no coinciden' });
      } else {
        //encriptar (hashear)
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            throw err;
          } else {
            console.log('HAAAAAAAAAAAAAAASH: ', hash);
            //guardado de datos en bd

            let sql =
              'insert into director (name, lastname, email, password) values (?,?,?,?)';
            let values = [name, lastname, email, hash];

            connection.query(sql, values, (errSQL, result) => {
              if (errSQL) {
                if (errSQL.errno === 1062) {
                  res.render('register', { message: 'Correo ya en uso' });
                } else {
                  throw errSQL;
                }
              } else {
                res.redirect('/director/loginForm');
              }
            });
          }
        });
      }
    }
  };

  showLogin = (req, res) => {
    res.render('login', { message: '' });
  };

  login = (req, res) => {
    const { email, password } = req.body;
    //verificar los datos
    if (!email || !password) {
      res.render('login', { message: 'Debes completar todos los campos' });
    } else {
      //preguntar a la base de datos si ese email existe
      let sql =
        'select * from director where email = ? and director_is_deleted = 0';
      connection.query(sql, [email], (err, result) => {
        if (err) {
          throw err;
        } else {
          // console.log('******************', result);
          if (result.length == 0) {
            //mandar mensaje de "no registrado"
            res.render('login', { message: 'El email no existe' });
          } else {
            //compruebo que la contraseña coinciden
            let hash = result[0].password;
            bcrypt.compare(password, hash, (errHash, resultCompare) => {
              if (errHash) {
                throw errHash;
              } else {
                if (!resultCompare) {
                  res.render('login', {
                    message: 'La contraseña te la has inventado ladrón',
                  });
                } else {
                  //si existe
                  res.redirect(`/director/profile/${result[0].id_director}`);
                }
              }
            });
          }
        }
      });
    }
  };

  //Forma facil de pedir un director con todas sus peliculas
  // profile = (req, res) => {
  //   const { id } = req.params;

  //   let sqlDirector =
  //     'select * from director where id_director = ? and director_is_deleted = 0';

  //   connection.query(sqlDirector, [id], (err, result) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       let sqlFilms =
  //         'select * from film where id_director = ? and film_is_deleted = 0';
  //       connection.query(sqlFilms, [id], (errFilm, films) => {
  //         if (errFilm) {
  //           throw errFilm;
  //         } else {
  //           res.render('directorProfile', {
  //             result: result[0],
  //             films,
  //           });
  //         }
  //       });
  //     }
  //   });
  // };

  //Forma dificil

  profile = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT d.*, f.title, f.release_year, f.id_film, f.id_director as film_id_director, f.film_img 
              FROM director d 
              LEFT JOIN film f ON d.id_director = f.id_director AND f.film_is_deleted = 0 
              WHERE d.director_is_deleted = 0 
              AND d.id_director = ?;
              `;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        let finalResult = {};
        let films = [];
        let film = {};

        result.forEach((elem) => {
          if (elem.id_film) {
            film = {
              id_film: elem.id_film,
              title: elem.title,
              release_year: elem.release_year,
              film_img: elem.film_img,
            };
          }
          films.push(film);
        });
        finalResult = {
          id_director: result[0].id_director,
          name: result[0].name,
          lastname: result[0].lastname,
          birth_date: result[0].birth_date,
          email: result[0].email,
          director_img: result[0].director_img,
          films,
        };
        console.log('***************', finalResult);
        res.render('directorProfileDificil', { finalResult });
      }
    });
  };

  showEditDirectorForm = (req, res) => {
    const { id } = req.params;
    let sql =
      'select * from director where id_director = ? and director_is_deleted = 0';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('***********', result);
        res.render('editDirectorForm', { message: '', result: result[0] });
      }
    });
  };

  editDirector = (req, res) => {
    // console.log('**********', req.body);
    // console.log('**********', req.file);

    const { id } = req.params;
    let { name, lastname, nationality, birth_date } = req.body;
    if (birth_date == '') {
      birth_date = null;
    }
    let sql =
      'update director set name = ?, lastname = ?, nationality = ?, birth_date = ? where id_director = ? and director_is_deleted = 0';
    let values = [name, lastname, nationality, birth_date, id];

    if (req.file) {
      sql =
        'update director set name = ?, lastname = ?, nationality = ?, birth_date = ?, director_img = ? where id_director = ? and director_is_deleted = 0';
      values = [name, lastname, nationality, birth_date, req.file.filename, id];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/director/profile/${id}`);
      }
    });
  };

  delLogic = (req, res) => {
    const { id } = req.params;

    // let sql =
    //   'update director set director_is_deleted = 1 where id_director = ?';

    let sql = `UPDATE director LEFT JOIN film 
                    ON director.id_director = film.id_director
                    SET director.director_is_deleted = 1,
                    film.film_is_deleted = 1
                    WHERE director.id_director = ?
                    `;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };

  delTotal = (req, res) => {
    const { id } = req.params;
    let sql = 'delete from director where id_director = ?';

    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };
}

module.exports = new DirectorController();

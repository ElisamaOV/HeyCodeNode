const connection = require('../config/db');
const bcrypt = require('bcrypt');
class DesignerController {
  showCreateDesignerForm = (req, res) => {
    res.render('createDesignerForm', { advice: '', confirm: '' });
  };

  createDesigner = (req, res) => {
    const {
      name,
      lastname,
      email,
      password,
      repPassword,
      description,
      city,
      phone,
    } = req.body;
    if (
      !name ||
      !lastname ||
      !email ||
      !password ||
      !repPassword ||
      !description ||
      !city ||
      !phone
    ) {
      res.render('createDesignerForm', {
        advice: ' - Falta algun campo - ',
        confirm: '',
      });
    } else {
      if (password !== repPassword) {
        res.render('createDesignerForm', {
          advice: ' - Las contraseñas no coinciden - ',
          confirm: '',
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            throw err;
          } else {
            let sql =
              'insert into designer (name, lastname, email, password, description, city, phone) values (?,?,?,?,?,?,?)';
            let values = [
              name,
              lastname,
              email,
              hash,
              description,
              city,
              phone,
            ];

            if (req.file) {
              sql =
                'insert into designer (name, lastname, email, password, description, city, phone, img_designer) values (?,?,?,?,?,?,?,?)';
              values = [
                name,
                lastname,
                email,
                hash,
                description,
                city,
                phone,
                req.file.filename,
              ];
            }

            connection.query(sql, values, (errSQL, result) => {
              if (errSQL) {
                if (errSQL.errno === 1062) {
                  res.render('createDesignerForm', {
                    advice: 'Correo ya en uso',
                    confirm: '',
                  });
                } else {
                  throw errSQL;
                }
              } else {
                res.render('createDesignerForm', {
                  advice: '',
                  confirm: 'Usuario creado correctamente!',
                });
              }
            });
          }
        });
      }
    }
  };

  showDesigner = (req, res) => {
    const { id } = req.params;
    let sql = 'select * from designer where id_designer = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('**********************', result);
        res.render('designer', { result });
      }
    });
  };
}

module.exports = new DesignerController();

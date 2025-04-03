const connection = require('../config/db');
class BreadController {
  showBread = (req, res) => {
    let sql = 'select * from bread where active = 0;';

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('bread', {
          bread: result,
        });
      }
    });
  };

  showOneBread = (req, res) => {
    const { id } = req.params;

    let sql = 'select * from bread where id = ?';

    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('oneBread', { bread: result[0] });
      }
    });
  };

  deleteTotal = (req, res) => {
    const { id } = req.params;

    let sql = 'delete from bread where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };

  deleteLogical = (req, res) => {
    const { id } = req.params;

    let sql = 'Update bread set active = 1 where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };

  editBreadGet = (req, res) => {
    const { id } = req.params;

    let sql = 'select * from bread where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('editBread', { bread: result[0] });
      }
    });
  };

  editBreadPost = (req, res) => {
    const { id } = req.params;
    const { name, origin } = req.body;

    let sql = 'UPDATE bread SET name = ?, origin = ? where id = ?';
    let values = [name, origin, id];

    if (req.file) {
      sql = 'UPDATE bread SET name = ?, origin = ? image = ? where id = ?';
      values = [name, origin, req.file.filename, id];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/bread/oneBread/${id}`);
      }
    });
  };
}

module.exports = new BreadController();

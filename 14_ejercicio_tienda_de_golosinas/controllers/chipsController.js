const connection = require('../config/db');

class ChipsController {
  showChips = (req, res) => {
    let sql = 'select * from chips where active = 0;';

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('chips', {
          chip: result,
        });
      }
    });
  };

  showChip = (req, res) => {
    const { id } = req.params;

    let sql = 'select * from chips where id = ?';

    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('oneChip', { chip: result[0] });
      }
    });
  };

  deleteTotal = (req, res) => {
    const { id } = req.params;

    let sql = 'delete from chips where id = ?';
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

    let sql = 'update chips set active = 1 where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };

  editChipGet = (req, res) => {
    const { id } = req.params;

    let sql = 'select * from chips where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('editChip', { chip: result[0] });
      }
    });
  };

  editChipPost = (req, res) => {
    const { id } = req.params;
    const { name, flavor, brand } = req.body;

    let sql = 'UPDATE chips SET name = ?, flavor = ?, brand = ? where id = ?';
    let values = [name, flavor, brand, id];

    if (req.file) {
      sql =
        'UPDATE chips SET name = ?, flavor = ?, brand = ?, image = ? where id = ?';
      values = [name, flavor, brand, req.file.filename, id];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/chips/chip/${id}`);
      }
    });
  };
}

module.exports = new ChipsController();

const connection = require('../config/db');

class CandiesController {
  showCandies = (req, res) => {
    let sql = 'select * from candies where active = 0;';

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('candies', {
          candies: result,
        });
      }
    });
  };

  showCandy = (req, res) => {
    const { id } = req.params;

    let sql = 'select * from candies where id = ?';

    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('oneCandy', { candy: result[0] });
      }
    });
  };

  deleteTotal = (req, res) => {
    const { id } = req.params;

    let sql = 'delete from candies where id = ?';
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

    let sql = 'Update candies set active = 1 where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  };

  editCandyGet = (req, res) => {
    const { id } = req.params;

    let sql = 'select * from candies where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('editCandy', { candy: result[0] });
      }
    });
  };

  editCandyPost = (req, res) => {
    const { id } = req.params;
    const { name, candy_type } = req.body;

    let sql = 'UPDATE candies SET name = ?, candy_type = ? where id = ?';
    let values = [name, candy_type, id];

    if (req.file) {
      sql =
        'UPDATE candies SET name = ?, candy_type = ?, image = ? where id = ?';
      values = [name, candy_type, req.file.filename, id];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/candies/candy/${id}`);
      }
    });
  };
}

module.exports = new CandiesController();

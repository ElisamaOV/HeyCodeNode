const connection = require('../config/db');
class IndexController {
  showHome = (req, res) => {
    let sql1 = 'select * from candies where active = 0;';
    let sql2 = 'select * from chips where active = 0';
    let sql3 = 'select * from bread where active = 0';

    connection.query(sql1, (err, result1) => {
      if (err) {
        throw err;
      }
      connection.query(sql2, (err, result2) => {
        if (err) {
          throw err;
        }
        connection.query(sql3, (err, result3) => {
          if (err) {
            throw err;
          }
          res.render('index', {
            candies: result1,
            chips: result2,
            bread: result3,
          });
        });
      });
    });
  };
}

module.exports = new IndexController();

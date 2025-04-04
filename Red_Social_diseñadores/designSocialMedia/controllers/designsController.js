const connection = require('../config/db');

class DesignsControllers {
  showCreateDesignForm = (req, res) => {
    const { id } = req.params;
    res.render('createDesignForm', { id });
  };

  createDesign = (req, res) => {
    const { id } = req.params;
    const { name, orientation, fabric, color, type, description } = req.body;

    let sql =
      'insert into design (id_designer, name, orientation, fabric, color, type, description) values (?,?,?,?,?,?,?)';
    let values = [id, name, orientation, fabric, color, type, description];

    if (req.file) {
      sql =
        'insert into design (id_designer, name, orientation, fabric, color, type, description, img_designer) values (?,?,?,?,?,?,?,?)';
      values = [
        id,
        name,
        orientation,
        fabric,
        color,
        type,
        description,
        req.file.filename,
      ];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/designer/showDesigner/${id}`);
      }
    });
  };

  showDesign = (req, res) => {
    const { id } = req.params;
    let sql = 'select * from design where id_design = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result[0]);
        res.render('design', { result: result[0] });
      }
    });
  };

  showDesignf = (req, res) => {
    const { id } = req.params;
    let sql = 'select * from design where id_design = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result[0]);
        res.render('designf', { result: result[0] });
      }
    });
  };

  editDesignGet = (req, res) => {
    const { id } = req.params;
    let sql = 'select * from design where id_design = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('editDesign', { result: result[0] });
      }
    });
  };
  editDesignPost = (req, res) => {
    const { id } = req.params;
    const { name, orientation, fabric, color, type, description } = req.body;
    let sql =
      'update design set name = ?, orientation = ?, fabric = ?, color = ?, type = ?, description = ? where id_design = ?';
    let values = [name, orientation, fabric, color, type, description, id];

    if (req.file) {
      sql =
        'update design set name = ?, orientation = ?, fabric = ?, color = ?, type = ?, description = ?, img_designer = ? where id_design = ?';
      values = [
        name,
        orientation,
        fabric,
        color,
        type,
        description,
        req.file.filename,
        id,
      ];
    }
    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/designs/showDesign/${id}`);
      }
    });
  };
}

module.exports = new DesignsControllers();

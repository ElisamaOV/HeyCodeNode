var express = require('express');
var router = express.Router();
//Aqui accedemos al archivo que tiene nuestro codigo para conectar con la base de datos
const connection = require('../config/db');
const uploadFile = require('../middleware/uploadFile');
//http://localhost:4000/
router.get('/', (req, res) => {
  //Llamar a la base de datos para traer datos que queremos pintar
  // Esta es la consulta de nuestra base de datos
  let sql = 'SELECT * FROM trainer;';
  //El primer parametro que introducimos es la query que queremos hacer en base de datos
  //Lo siguiente es un callback con dos parametros, el primero será un posible error
  //el segundo es el resultado de la peticion
  //Aqui la query es correcta y nos devuelve un array de objetos
  //Si la query de arriba fuera erronea nos devolvería un error diciendo
  //que la tabla no existe por ejemplo, siempre suele decir por donde suele
  // estar el error, el error suele salir de color verde.
  //EL RENDER TIENE QUE ESTAR DENTRO DE LA CONSULTA SQL YA QUE EN ESTE CASO
  //ESTÁ DENTRO DE NUESTRO CALLBACK Y NO SE PUEDE USAR FUERA DEL CONNECTION.QUERY
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.render('index', {
        title: 'Escuela de Yoga',
        trainers: result,
      });
    }
  });
});
//POST DEL FORMULARIO DE NUESTRO INDEX, QUE NOS REDIRIGE A LA MISMA PAGINA
//http://localhost:4000/
router.post('/', uploadFile('trainers'), (req, res) => {
  //CON ESTO VEMOS LOS DATOS DE NUESTRA FOTO Y EL NOMBRE QUE LE DA MULTER
  console.log('FOTOOOOOOOOOOOOOOOOO', req.file.filename);
  //SACAR LOS VALORES DE REQ.BODY CON DESTRUCTURING PARA AGREGARLOS A NUESTRO ARRAY VALORES
  const { name, last_name, biography, specialty } = req.body;

  //AHORA VIENE LA CONSULTA PARA GUARDAR TANTO LOS DATOS INTRODUCIDOS COMO LA FOTO CON SQL PARAMETRIZADAS
  let sql =
    'INSERT INTO trainer (name, last_name, biography, specialty) VALUES (?,?,?,?)';
  let values = [name, last_name, biography, specialty];

  //SI NO ME VIENE FOTO, NO ENTRARÁ AQUI, PORQUE REQ.FILE SERÁ UNDEFINED, SI ME VIENE FOTO CAMBIARÁ A ESTE IF DE TAL MANERA QUE LE PASAREMOS NUEVOS PARAMETROS DE SQL
  if (req.file != undefined) {
    sql =
      'INSERT INTO trainer (name, last_name, biography, specialty, trainer_img) VALUES (?,?,?,?,?)';
    values = [name, last_name, biography, specialty, req.file.filename];
  }

  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;

const mysql = require('mysql2');
const connection = mysql.createConnection({
  //Donde corre nuestro servidor
  host: 'localhost',
  //El usuario que tiene acceso a nuestra base de datos
  user: 'root',
  //Contraseña de nuestra base de datos
  password: 'root',
  //Base de datos a la que accedemos
  database: 'yoga',
});

//Prueba de conexion
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Conexion ok');
  }
});

module.exports = connection;

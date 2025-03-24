// requerir la librería express
const express = require('express');

// instanciamos express (creamos la aplicación servidora)
const app = express();

//middlewares (toda petición va a pasar por estas funciones antes de llegar a los endpoints)

//da permiso a que todas las peticiones puedan acceder a nuestra carpeta public, que es donde está el contenido estático
app.use(express.static(__dirname + '/public'));

// asignamos un puerto
const port = 4000;

//creacion de rutas o endpoints
// Las rutas get son aquellas que nos responden sin recibir datos
// Las rutas post son aquellas que nos responden recibiendo datos antes y
// normalmente son peticiones asociadas a la creacion de registros nuevos en la
// base de datos

console.log('ruta relativa: ', __dirname);
//http://localhost:4000/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});
//http://localhost:4000/about
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/html/about.html');
});

//levantamos el servidor en localhost y el puerto 4000
app.listen(port, () => {
  console.log('Corriendo por el puerto ' + port);
});

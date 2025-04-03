//Declaramos variable express con express
const express = require('express');
//Damos un puerto a nuestra aplicacion
const port = 4000;
//--------------------------------RUTAS-----------------------------------------
const indexRoutes = require('./routes/index.router');
const productRoutes = require('./routes/pedidos.router');
const userRoutes = require('./routes/user.router');
//--------------------------------RUTAS-----------------------------------------
//instanciamos nuestra aplicacion
const app = express();

//ESTO ES UN HABITO PARA USAR TODAS LAS LIBRERIAS QUE VAMOS A REQUERIR
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CREAMOS NUESTROS ENDPOINTS
app.use('/', indexRoutes); //Esta es la ruta y lo de debajo es lo que habia antes de hacer routes
// //https://localhost:4000/
// router.get('/', (req, res) => {
//   res.sendFile(__dirname + '/html/index.html');
// });

app.use('/pedidos', productRoutes); // Esta es la ruta y lo de abjao es lo que habia antes de hacer routes
// //https://localhost:4000/pedidos
// app.get('/pedidos', (req, res) => {
//   res.sendFile(__dirname + '/html/pedidos.html');
// });
// //Recibir los datos de la pizza que queriamos del formulario
// app.post('/pedidos/createPedido', (req, res) => {
//   res.sendFile(__dirname + '/html/createPedido.html');
//   console.log(req.body);
// });

app.use('/users', userRoutes);
// //https://localhost:4000/users/createUser
// app.get('/users/createUser', (req, res) => {
//   res.sendFile(__dirname + '/html/createUser.html');
// });
// //Recibir los datos de la pizza que queriamos del formulario
// app.post('/users/createUser', (req, res) => {
//   res.sendFile(__dirname + '/html/createUserConfirm.html');
//   console.log(req.body);
// });

//Ponemos nuestra app a escuchar lo que le llega
app.listen(port, () => {
  console.log('Corriendo por el puerto ' + port);
});

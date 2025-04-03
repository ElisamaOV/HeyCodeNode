const express = require('express');
const port = 4000;
const app = express();

//LIBRERIAS QUE VAMOS A USAR DE USUAL
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//--------------------------------RUTAS-----------------------------------------
const indexRoutes = require('./routes/index.router');
const recipesRoutes = require('./routes/recipes.router');
const commentRoutes = require('./routes/comment.router');
app.use('/', indexRoutes);
app.use('/recipes', recipesRoutes);
app.use('/comment', commentRoutes);
//--------------------------------RUTAS-----------------------------------------

//ENDPOINTS
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/html/index.html');
// });

// app.get('/recipes/pasteles', (req, res) => {
//   res.sendFile(__dirname + '/html/pasteles.html');
// });

// app.get('/recipes/tartas', (req, res) => {
//   res.sendFile(__dirname + '/html/tartas.html');
// });

// app.get('/recipes/galletas', (req, res) => {
//   res.sendFile(__dirname + '/html/galletas.html');
// });

// app.get('/recipes/postres', (req, res) => {
//   res.sendFile(__dirname + '/html/postres.html');
// });

// app.get('/recipes/tartas/:idTarta', (req, res) => {
//   let id = req.params.idTarta;
//   res.send(`Estamos en ${id}`);
// });

// app.post('/comment', (req, res) => {
//   res.sendFile(__dirname + '/html/comment.html');
//   console.log(req.body);
// });

//SERVIDOR ESCUCHANDO PETICIONES
app.listen(port, () => {
  console.log('Corriendo por el puerto ' + port);
});

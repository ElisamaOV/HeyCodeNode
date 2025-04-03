const express = require('express');
const port = 4000;
const app = express();

//middlewares
//esta linea nos permite aceptar datos de un formulario!!!!!!!!!!!!!!!!!
app.use(express.urlencoded({ extended: false }));
//esta linea nos permite aceptar datos en formato json
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/html/register.html');
});

app.post('/register', (req, res) => {
  console.log(req.body);
  let { nombre, email, pass } = req.body;
  res.send(
    `Datos recibidos ok, he recibido nombre: ${nombre} email: ${email} pass: ${pass}`
  );
});

app.listen(4000, () => {
  console.log('Corriendo por el puerto ' + port);
});

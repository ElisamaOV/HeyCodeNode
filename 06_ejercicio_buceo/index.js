const express = require('express');
const app = express();
const port = 4001;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/biodiv', (req, res) => {
  res.sendFile(__dirname + '/public/html/biodiv.html');
});

app.get('/cursos', (req, res) => {
  res.sendFile(__dirname + '/public/html/cursos.html');
});

app.get('/destinations', (req, res) => {
  res.sendFile(__dirname + '/public/html/destinations.html');
});

app.listen(port, () => {
  console.log('Corriendo por el puerto ' + port);
});

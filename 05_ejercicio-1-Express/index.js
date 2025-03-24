// un servidor que nos sirva un home con una bienvenida, dos fotos y un navbar que pueda navegar entre home y equipo
// otra html equipo que muestra las 4 fotos y algún texto

const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const port = 4000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/team', (req, res) => {
  res.sendFile(__dirname + '/public/html/team.html');
});

app.listen(port, () => {
  console.log('Corriendo por el puerto ' + port);
});

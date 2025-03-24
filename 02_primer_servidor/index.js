//requerimos la libreria http (que no hemos podido instalar porque ya viene instalada dentro del core de node)

//nos proporciona metodos para manejar servidores
const http = require('http');

//direccion donde se va a montar el servidor en desarrollo, trabajando en nuestro propio ordenador
const hostname = '127.0.0.1'; // esto es igual que localhost

//numero exacto donde está alojado nuestro servidor ( donde está escuchando nuestro servidor)
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain")
  res.end("Hola Mundo");
});

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo por el puerto ${port}`);
});


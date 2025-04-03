const express = require('express');
const port = 4000;

const app = express();

//endpoints o rutas
//http:localhost:4000/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

//ruta dinámica(ruta normal que tiene un parametro dinámico que se llama como esta despues de los dos :)
//http://localhost:4000/infoBicicleta/algo
app.get('/infoBicicleta/:idBicicleta', (req, res) => {
  let bicis = [
    {
      id: '1',
      modelo: 'bici1 txt',
      price: 10,
    },
    {
      id: '2',
      modelo: 'bici2 grh',
      price: 100,
    },
    {
      id: '3',
      modelo: 'bici3 opy',
      price: 1000,
    },
    {
      id: '4',
      modelo: 'bici4 ping y pong',
      price: 10000,
    },
  ];

  let id = req.params.idBicicleta;
  console.log(id);
  let result = bicis.find((elem) => {
    return elem.id === id;
  });

  console.log('La bici elegida es: ', result);

  res.send(
    `La bici elegida es ${result.modelo} y el precio es ${result.price}`
  );
});

//ruta dinámica que recoja de la ruta el nombre de una persona y responda con "Hola Maria"
app.get('/personas/:nombre', (req, res) => {
  let name = req.params.nombre;
  res.send(`hola ${name}`);
});
//CUIDADDDDDDOOOOOOO CON PONER RUTAS ESTÁTICAS IGUALES A DINÁMICAS
//AQUI NO VA A ENTRAR NUNCA
app.get('/personas/info', (req, res) => {
  res.send(`Estoy en info de personas`);
});

app.get('/mascotas/:raza/:color', (req, res) => {
  console.log('************', req.params);

  // let raza = req.params.raza;
  // let color = req.params.color;
  //lado izuqierod let o const, {} y dentro nombre de variables exactamente igual que las prpiedades que tiene el objeto

  let { raza, color } = req.params;

  res.send(`Has elegido a ${raza} que es de color ${color}`);
});

app.listen(port, () => {
  console.log(`Escuchando por el puerto ${port}`);
});

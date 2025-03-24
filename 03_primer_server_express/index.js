const express = require('express');
const app = express();
const port = 4000;

//un endpoint (es una direccion que está dando una peticion y que cuando detecta 
// que ha habido una peticion por esa direccion nos devuelve la respuesta)

//http://localhost:4000/
//http://127.0.0.1:4000/
app.get("/", (req, res) => {
  // console.log(req.headers);
  console.log("reeess", res);
  res.send("Esta es mi primera respuesta");
})

app.get("/about", (req, res) => {
  res.send("Estoy en el endpoint del about")
})

app.listen(port, () => {console.log(`Corriendo por el ${port}`)});


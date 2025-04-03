const express = require('express');

const indexRoutes = require('./routes/index.router')
const productosRoutes = require('./routes/products.router')
const usersRoutes = require('./routes/users.router')

const port = 4000;

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//http://localhost:4000/procuctos/oneProduct/17
app.use("/", indexRoutes);
app.use("/productos", productosRoutes);
app.use("/users", usersRoutes);

app.listen(port, ()=>console.log("corriendo" + port));
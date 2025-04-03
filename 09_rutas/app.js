const express = require('express');
const indexRoutes = require('./routes/index.router');
const productsRoutes = require('./routes/products.router');
const usersRoutes = require('./routes/users.router');
const port = 4000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log('Corriendo por el puerto ' + port);
});

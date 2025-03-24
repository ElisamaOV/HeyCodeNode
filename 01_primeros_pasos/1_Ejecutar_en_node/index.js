console.log("hola");

function sumar(a, b) {
  console.log(a + b );
}

sumar(2, 3);

/* 

1.- Version HTTP
2.- URL destino
3.- información del cliente (remitente)
4.- permisos
5.- método http es la peticion (get, post, put, patch, delete...) tema semántico
  - get: orientadas a pedir datos al back (no admite datos dentro)
  -post: orientado crear un registro nuevo en base de datos (tb para mandar datos al back que no supongan
  ningun tipo de modificacion de la bd)
  - put: orientado modificar (todo el registro) un registro de la bd
  - patch: orientado a modificar de manera parcial un registro de la db
  - delete: orientado a borrar registros en la db



RESPUESTA HTTP

1.- codigo de estado: numero de 3 digitos que informa que ha pasado con la transaccion
    todo okey : 2xx (200, 201,202,203)
    - hay un fallo en la petición: 4xx (400, 404, 401, 402...)
    - fallos del servidor: 5xx (500,501, 502, 503)

*/





let req = {
  headers: {
    url:"www.google.com",
    method: "post",
    cookies: {},
    accept: {},
    Authorization: {}
  },

  body: {
    email: "s@s.com",
    password: "123"
  },

  params: {

  }
}

let res = {
  headers: {
    //informacion de como ha ido la transaccion
  },

  body: {

  }
}
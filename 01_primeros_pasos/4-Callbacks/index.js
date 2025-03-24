//CALLBACK
//Es una funcion que se pasa por parametro a otra funcion

const sumar = (a, b) => {
  return a + b;
}

const restar = (a, b) => {
  return a - b;
}

const imprimir = (num1, num2, callback) => {

  console.log(callback(num1, num2));
}


imprimir(2, 3, sumar);
imprimir(34, 54, restar);


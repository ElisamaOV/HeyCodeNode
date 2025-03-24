//export
console.log("Hola people!!!!!")
let kms = 100;
// function sumar(a, b) {
//   return a + b;
// };

const sumar = (a, b) => {
  //procesar cosas
  return a + b;
};

// const sumar = (a, b) => a + b; ----> return implicita


// function restar (a, b) {
//   return a - b;
// };

const restar = (a, b) => {
  return a - b;
}



module.exports = {
  funcionSumar: sumar,
  funcionRestar: restar,
  kms: kms
}

// console.log(module);
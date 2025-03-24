const mayusc = (valor) => {
  return valor.toUpperCase();
}

const minusc = (valor) => {
  return valor.toLowerCase();
}

//exportacion modificando la propiedad exports de module
// module.exports = {
//   mayusc: mayusc,
//   minusc: minusc
// }

//exportacion modificando directamente propiedades dentro de exports
exports.mayusc = mayusc;
exports.minusc = minusc;

let coche = {
  matric: "234235GTR"
}

console.log("cccocheeee", coche)
coche.numpuertas = 4;
console.log("cccocheeee despues de añadir", coche);
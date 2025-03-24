// un archivo funcionesMat.js que exporte dividir y multiplicar. que las 
// funciones devuelvan los valores del resultado de dividir o multiplicar. 
// (la función dividir, si se divide entre 0 devuelva un texto "no se puede 
// dividir entre 0 ")
// otro archivo funcionesTexto que exporte una función que reciba un texto y lo 
// devuelva todo en mayusc y otra función que devuelva todo en minusculas hay 
// que requerirlos en index.js y ejecutarlas desde éste


const mathFuncs = require("./modules/funcionesMaths");
console.log(mathFuncs);
const textFuncs = require("./modules/funcionesTexto");
console.log(textFuncs);

console.log(`La division de 4 y 2 es ${mathFuncs.dividir(4,2)}`);
console.log(`La division de 2 y 0 es ${mathFuncs.dividir(2,0)}`);
console.log(`La multiplicacion de 2 y 5 es ${mathFuncs.multiplicar(2,5)}`);
console.log(`La division de 2 y 4 es ${mathFuncs.multiplicar(2,4)}`);



console.log(textFuncs.mayusc("EstA cOsA MoLaAAaA"));
console.log(textFuncs.minusc("EstA cOsA MoLaAAaA"));
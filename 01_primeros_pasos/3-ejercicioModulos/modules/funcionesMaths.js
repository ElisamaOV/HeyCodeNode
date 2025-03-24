
const dividir = (a, b) => {
  let res;
  if(b == 0) {
    res = "No se puede dividir entre 0";
  }
  else {
    res = a / b;
  }
  return res
}


const multiplicar = (a, b) => {
  return a * b;
}

module.exports = {
  dividir: dividir,
  multiplicar: multiplicar
}
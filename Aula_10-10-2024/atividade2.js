function ordenarNumeros(array) {
    return array.sort((a, b) => a - b);
}

let numeros = [5, 1, 4, 2];
let resultado = ordenarNumeros(numeros);
console.log(resultado);

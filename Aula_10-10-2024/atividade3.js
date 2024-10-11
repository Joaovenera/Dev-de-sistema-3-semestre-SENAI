function somaDigitos(numero) {
    return String(numero)
        .split('')
        .map(Number)
        .reduce((acc, digito) => acc + digito, 0);
}

let numero = 123;
let resultado = somaDigitos(numero);
console.log(resultado);

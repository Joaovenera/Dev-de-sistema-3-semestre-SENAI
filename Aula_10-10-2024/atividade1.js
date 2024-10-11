function contarCaracteres(string) {
    let contagem = {};

    for (let caractere of string) {
        if (contagem[caractere]) {
            contagem[caractere]++;
        } else {
            contagem[caractere] = 1;
        }
    }
    return contagem;
}

let frase = "banana";
let resultado = contarCaracteres(frase);
console.log(resultado); 

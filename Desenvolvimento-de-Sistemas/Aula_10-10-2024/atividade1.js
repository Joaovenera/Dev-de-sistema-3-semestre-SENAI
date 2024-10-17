function atividade1(string) {
    let contagem = {};

    for (let caractere of string) {
        contagem[caractere] = (contagem[caractere] || 0) + 1;
    } 

    let contagemOrdenada = Object.entries(contagem).sort((a, b) => b[1] - a[1]);

    let contagemFinal = {};
    contagemOrdenada.forEach(([caractere, quantidade]) => {
        contagemFinal[caractere] = quantidade;
    });

    return contagemFinal;
}

// Exemplo de uso
let frase = "bananaa a asda asdasd";
let resultado = atividade1(frase);
console.log(resultado);

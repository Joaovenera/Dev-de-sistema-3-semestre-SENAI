function atividade3(numero) {
    
    if (isNaN(numero) || numero.includes('-') || numero.includes('.')) {
        throw new Error("A entrada deve conter apenas dígitos.");
    }

    return String(numero)
        .split('')
        .map(Number)
        .reduce((acc, digito) => acc + digito, 0);
}

// Exemplo de uso
let numero = "12345";
let resultado = atividade3(numero);
console.log(resultado);

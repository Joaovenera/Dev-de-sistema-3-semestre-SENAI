function atividade4(lista) {
    if (lista.length === 0) {
        return null;
    }
    const maiorNumero = Math.max(...lista);
    
    return maiorNumero;
}

// Exemplo de uso
const numeros = [3, 7, 2, 5];
const resultado = atividade4(numeros);
console.log(resultado);
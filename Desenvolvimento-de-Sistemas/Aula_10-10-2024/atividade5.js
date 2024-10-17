function atividade5(str) {
    if (str.length === 0) {
        return "";
    }
    
    return str.split('').reverse().join('');    
}

// Exemplo de uso
const palavra = "OpenAI";
const resultado = atividade5(palavra);
console.log(resultado);
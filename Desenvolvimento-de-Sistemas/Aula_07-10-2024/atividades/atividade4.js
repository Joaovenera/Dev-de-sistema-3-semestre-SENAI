function verificarPalindromo(input) {
    const inputNormal = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const inputReverso = input.split("").reverse().join("");
    if (input === inputReverso) {
      return "É um palíndromo";
    } else {
      return "Não é um palíndromo";
    }
  }
  
  module.exports = {atividade4:verificarPalindromo};

  //const input = prompt("Insira uma palavra ou uma frase: ");
  //console.log(checkPalindrome(input));
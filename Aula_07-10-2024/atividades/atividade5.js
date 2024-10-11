function verificaPrimo(n) {
    if (n <= 1) {
      return `${n} não é primo.`;
    } else {
      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
          return `${n} não é primo.`;
        }
      }
      return `${n} é primo.`;
    }
  }
  
  module.exports = {atividade5:verificaPrimo};

  //const num = parseInt(prompt("Digite um número: "));
 // console.log(verificaPrimo(num));
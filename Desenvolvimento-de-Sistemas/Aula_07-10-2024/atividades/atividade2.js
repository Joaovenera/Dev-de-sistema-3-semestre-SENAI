function calcularfatorial(n) {
    if (n === 0) {
      return "Fatorial de 0 é 1.";
    } else {
      let fatorial = 1;
      for (let i = 1; i <= n; i++) {
        fatorial *= i;
      }
      return `Fatorial de ${n} é ${fatorial}.`;
    }
  }
  
  module.exports = {atividade2:calcularfatorial};

//  const num = parseInt(prompt("Insira um número: "));
//  console.log(calcularfatorial(num));
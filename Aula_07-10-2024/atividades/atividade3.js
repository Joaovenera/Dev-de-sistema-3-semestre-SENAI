function sequenciaFibonacci(n) {
    if (n <= 0) {
      return [];
    } else if (n === 1) {
      return [0];
    } else if (n === 2) {
      return [0, 1];
    } else {
      let sequencia = [0, 1];
      for (let i = 2; i < n; i++) {
        sequencia.push(sequencia[i - 1] + sequencia[i - 2]);
      }
      return sequencia;
    }
  }
  
  module.exports = {atividade3:sequenciaFibonacci};
  
  //const num = parseInt(prompt("insira o numero de sequencias: "));
  //console.log(sequenciaFibonacci(num));
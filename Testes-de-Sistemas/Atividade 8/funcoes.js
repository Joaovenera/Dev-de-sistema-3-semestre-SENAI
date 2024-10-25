function soma(a, b) {
    return a + b;
  }
  
  function isPositivo(num) {
    return num > 0;
  }
  
  function retornaNull() {
    return null;
  }
  
  function criaObjeto(nome, idade) {
    return { nome, idade };
  }
  
  function lancaErro() {
    throw new Error('Erro lançado!');
  }
  
  module.exports = { soma, isPositivo, retornaNull, criaObjeto, lancaErro };
  
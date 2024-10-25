const { soma, isPositivo, retornaNull, criaObjeto, lancaErro } = require('./funcoes');

test('soma deve retornar o valor correto', () => {
  expect(soma(1, 2)).toBe(3);
  expect(soma(1, 2)).not.toBe(5);
});

test('soma deve ser maior que um valor', () => {
  expect(soma(3, 4)).toBeGreaterThan(5);
  expect(soma(3, 4)).toBeGreaterThanOrEqual(7);
});

test('soma deve ser menor que um valor', () => {
  expect(soma(1, 1)).toBeLessThan(5);
  expect(soma(1, 1)).toBeLessThanOrEqual(2);
});

test('verifica se número é positivo', () => {
  expect(isPositivo(5)).toBeTruthy();
  expect(isPositivo(-5)).toBeFalsy();
});

test('retorna null', () => {
  expect(retornaNull()).toBeNull();
});

test('criação de objeto', () => {
  const obj = criaObjeto('João', 18);
  expect(obj).toEqual({ nome: 'João', idade: 18 });
  expect(obj.nome).toMatch(/João/);
});

test('lancaErro deve lançar um erro', () => {
  expect(() => lancaErro()).toThrow('Erro lançado!');
});

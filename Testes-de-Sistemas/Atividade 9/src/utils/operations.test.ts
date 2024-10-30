import { sum, subtract, multiply, divide, equal, allClear } from './operations';

describe('Funções de operações matemáticas', () => {
  it('Caso 1: Deve somar dois números', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('Caso 2: Deve subtrair dois números', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it('Caso 3: Deve multiplicar dois números', () => {
    expect(multiply(4, 3)).toBe(12);
  });

  it('Caso 4: Deve dividir dois números', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('Caso 5: Deve retornar Infinity ao dividir por zero', () => {
    expect(divide(5, 0)).toBe(Infinity);
  });

  it('Caso 6: Deve retornar o segundo número com equal', () => {
    expect(equal(5, 3)).toBe(3);
  });

  it('Caso 7: Ddeve retornar zero com allClear', () => {
    expect(allClear()).toBe(0);
  });
});

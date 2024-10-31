import { removeZeroLeft } from './removeZeroLeft';

describe('Função removeZeroLeft', () => {
  it('Caso 1: Deve remover zeros à esquerda', () => {
    expect(removeZeroLeft("0023")).toBe("23");
  });

  it('Caso 2: Não deve remover zero de uma string com um único zero', () => {
    expect(removeZeroLeft("0")).toBe("0");
  });

  it('Caso 3: Não deve remover zeros de números que não possuem zeros à esquerda', () => {
    expect(removeZeroLeft("123")).toBe("123");
  });
});

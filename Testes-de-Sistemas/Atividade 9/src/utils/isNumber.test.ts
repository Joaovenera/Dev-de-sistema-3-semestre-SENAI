import { isNumber } from './isNumber';

describe('Função isNumber', () => {
  it('Caso 1: Deve retornar true para número positivo', () => {
    expect(isNumber("123")).toBe(true);
  });

  it('Caso 2: Deve retornar true para número negativo', () => {
    expect(isNumber("-123")).toBe(true);
  });

  it('Caso 3: Deve retornar true para número decimal', () => {
    expect(isNumber("123.45")).toBe(true);
  });

  it('Caso 4: Deve retornar false para string vazia', () => {
    expect(isNumber("")).toBe(false);
  });

  it('Caso 5: Deve retornar false para string com caracteres', () => {
    expect(isNumber("123abc")).toBe(false);
  });
});

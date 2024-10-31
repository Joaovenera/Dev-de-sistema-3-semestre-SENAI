import { isDot } from './isDot';

describe('Função isDot', () => {
  it('Caso 1: Deve retornar true para ponto único', () => {
    expect(isDot(".")).toBe(true);
  });

  it('Caso 2: Deve retornar false para um caractere único que não seja ponto', () => {
    expect(isDot("a")).toBe(false);
  });

  it('Caso 3: Deve retornar false para uma string numérica', () => {
    expect(isDot("1")).toBe(false);
  });

  it('Caso 4: Deve retornar false para uma string vazia', () => {
    expect(isDot("")).toBe(false);
  });

  it('Caso 5: Deve retornar false para múltiplos caracteres que incluem um ponto', () => {
    expect(isDot(".0")).toBe(false);
    expect(isDot("0.0")).toBe(false);
  });
});

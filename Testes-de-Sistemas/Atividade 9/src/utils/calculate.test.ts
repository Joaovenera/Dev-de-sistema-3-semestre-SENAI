import { calculate } from './calculate';

describe('Função calculate', () => {
  it('Caso 1: Deve somar dois números', () => {
    expect(calculate("+", "7", "8")).toBe("15");
  });

  it('Caso 2: Deve subtrair dois números', () => {
    expect(calculate("-", "5", "3")).toBe("2");
  });

  it('Caso 3: Deve multiplicar dois números', () => {
    expect(calculate("x", "4", "3")).toBe("12");
  });

  it('Caso 4: Deve dividir dois números', () => {
    expect(calculate("/", "10", "2")).toBe("5");
  });

  it('Caso 5: Deve lidar com divisão por zero', () => {
    expect(calculate("/", "5", "0")).toBe("Infinity");
  });

  it('Caso 6: Deve lidar com números negativos', () => {
    expect(calculate("+", "-2", "3")).toBe("1");
  });

  it('Caso 7: Deve lidar com números decimais', () => {
    expect(calculate("+", "2.5", "3.5")).toBe("6");
  });

  it('Caso 8: Deve lidar com números com zeros à esquerda', () => {
    expect(calculate("+", "002", "3")).toBe("5");
  });
});

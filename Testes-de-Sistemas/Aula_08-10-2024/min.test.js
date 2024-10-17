const min = require("./min");

// Testes Simples
test("Subtrair dois números positivos", () =>{
    expect(min(5, 3)).toBe(2);
    expect(min(10, 7)).toBe(3);
});

test("Subtrair dois números negativos", () =>{
    expect(min(-1, -2)).toBe(1);
    expect(min(-5, -3)).toBe(-2);
});

test("Subtrair um número positivo e um número negativos", () =>{
    expect(min(4, -2)).toBe(6);
    expect(min(-4, 2)).toBe(-6);
});

test("Subtrair um número positivo com zero", () =>{
    expect(min(4, 0)).toBe(4);
    expect(min(0, 4)).toBe(-4);
});

// Testes Limite
test("Subtrair números grandes", () => {
    expect(min(1000000, 500000)).toBe(500000);
    expect(min(999999999, 1)).toBe(999999998);
});

test("Subtrair números decimais", () => {
    expect(min(0.1, 0.01)).toBeCloseTo(0.09, 10);
    expect(min(1.23, 0.23)).toBeCloseTo(1.00, 10);
});

test("Subtrair e resultar em número negativo", () => {
    expect(min(3, 5)).toBe(-2);
    expect(min(-1, 1)).toBe(-2);
});

// Testes Erro
test("Subtrair com valores indefinidos ou nulos", () => {
    expect(() => min(undefined, 3)).toThrow("Os argumentos devem ser números");
    expect(() => min(3, undefined)).toThrow("Os argumentos devem ser números");
    expect(() => min(null, 5)).toThrow("Os argumentos devem ser números");
    expect(() => min(5, null)).toThrow("Os argumentos devem ser números");
});

test("Subtrair valores não numéricos", () => {
    expect(() => min("a", 3)).toThrow("Os argumentos devem ser números");
    expect(() => min(3, "b")).toThrow("Os argumentos devem ser números");
    expect(() => min("a", "b")).toThrow("Os argumentos devem ser números");
});

// Teste extremos
test("Subtrair números infinitos", () => {
    expect(min(Infinity, 1000)).toBe(Infinity);
    expect(min(-Infinity, -1000)).toBe(-Infinity);
});

